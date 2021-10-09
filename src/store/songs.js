import firebase from "firebase/compat/app";

export default {
  state: {
    currentSong: null,
  },
  mutations: {
    setSong(state, song) {
      state.currentSong = song;
    },
  },
  actions: {
    async getFirstSong({ getters, commit }, params) {
      const [id, idx = 0] = params;

      const alb = getters.albums.find((alb) => alb.id === id);
      const url = await firebase
        .storage()
        .ref(`/${id}/`)
        .child(`${alb.tracks[idx].ref}.mp3`)
        .getDownloadURL();
      console.log(url);
      const song = { albumImg: alb.src, ...alb.tracks[idx], id: alb.id, url };

      commit("setSong", song);
    },
  },
  getters: {
    song: (s) => s.currentSong,
  },
};
