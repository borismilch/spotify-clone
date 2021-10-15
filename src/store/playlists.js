import firebase from "firebase/compat/app";
import img from "../utils/default";
export default {
  state: {
    playlists: [],
  },
  mutations: {
    setPlaylists(state, playlists) {
      state.playlists = playlists;
    },
  },
  actions: {
    async addPlaylist({ dispatch, getters }) {
      const uid = await dispatch("getUid");
      const template = {
        img: img.img,
        title: `Плейліст №${getters.playlistsL + 1}`,
        description: "",
        tracks: [],
      };
      await firebase.database().ref(`/users/${uid}/playlists`).push(template);
      await dispatch("fetchPlaylists");
    },

    async fetchPlaylists({ dispatch, commit }) {
      const uid = await dispatch("getUid");
      let playlists = (
        await firebase.database().ref(`/users/${uid}/playlists`).once("value")
      ).val();
      playlists = Object.keys(playlists || []).map((key) => ({
        ...playlists[key],
        id: key,
        tracks: Object.values(playlists[key].tracks || []),
      }));
      commit("setPlaylists", playlists);
    },
    async updatePlaylist({ dispatch }, params) {
      const [id, playlist] = params;
      console.log(params);
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/playlists/${id}`)
        .update({ ...playlist });
      await dispatch("fetchPlaylists");
    },
    async removePlaylist({ dispatch }, id) {
      console.log(id);
      const uid = await dispatch("getUid");
      await firebase.database().ref(`/users/${uid}/playlists/${id}`).remove();
      await dispatch("fetchPlaylists");
    },
    async addTrackToPlaylist({ dispatch }, params) {
      const uid = await dispatch("getUid");
      console.log(params);
      await firebase
        .database()
        .ref(`/users/${uid}/playlists/${params.id}/tracks`)
        .push({ ...params });
      await dispatch("fetchPlaylists");
    },
  },
  getters: {
    playlists: (s) => s.playlists,
    playlistsL: (s) => s.playlists.length,
  },
};
