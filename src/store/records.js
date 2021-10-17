import firebase from "firebase/compat/app";

export default {
  state: {
    albums: [],
    users: [],
  },
  mutations: {
    setAlbums(state, albums) {
      state.albums = albums;
    },
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async fetchAlbums({ dispatch, commit }) {
      let albums = (
        await firebase.database().ref("/albums").once("value")
      ).val();
      albums = await dispatch("filterAlbums", albums);
      commit("setAlbums", albums);
    },
    async filterAlbums({ dispatch }, albums) {
      const uid = await dispatch("getUid");
      const likes = await dispatch("getLikes");
      console.log(Object.values(likes));
      return Object.keys(albums).map((key) => ({
        ...albums[key],
        author: albums[key].creator === uid,
        id: key,
        tracks: (albums[key].tracks || []).map((t) => ({
          ...t,
          parent: key,
          album: albums[key].title,
          liked: !!Object.values(likes).find(
            (l) => l.ref === t.ref && l.id === key
          ),
        })),
      }));
    },
    async addAlbums({ dispatch }, params) {
      const [alb, audios, id] = params;
      console.log(alb);
      await firebase
        .database()
        .ref(`/albums/${id}`)
        .update({ ...alb });
      await dispatch("fetchAlbums");

      alb.tracks.forEach(async (t, idx) => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`${id}/${t.ref}`);

        await fileRef.putString(audios[idx], "data_url");
      });
    },
    async createEmptyAlbum({ dispatch }, alb) {
      await firebase.database().ref("/albums").push(alb);
      await dispatch("fetchAlbums");
      let albums = (
        await firebase.database().ref("/albums").once("value")
      ).val();
      albums = await dispatch("filterAlbums", albums);
      const id = albums[albums.length - 1].id;
      console.log(id);
      return id;
    },
    async deleteAlbum({ dispatch }, id) {
      await firebase.database().ref(`/albums/${id}`).remove();
      await dispatch("fetchAlbums");
    },
  },
  getters: {
    albums: (s) => s.albums,
    likesVal: (s) => s.likes,
  },
};
