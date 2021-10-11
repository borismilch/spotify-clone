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
    async addAlbums({ dispatch }, alb) {
      console.log(alb);
      await firebase.database().ref("/albums").push(alb);
      await dispatch("fetchAlbums");
    },
    async fetchAlbums({ dispatch, commit }) {
      // const uid = dispatch("getUid");
      let albums = (
        await firebase.database().ref("/albums").once("value")
      ).val();
      albums = await dispatch("filterAlbums", albums);
      commit("setAlbums", albums);
    },
    async filterAlbums({ dispatch }, albums) {
      const uid = await dispatch("getUid");
      return Object.keys(albums).map((key) => ({
        ...albums[key],
        author: albums[key].creator === uid,
        id: key,
        tracks: albums[key].tracks.map((t) => ({ ...t, active: false })),
      }));
    },
  },
  getters: {
    albums: (s) => s.albums,

  },
};
