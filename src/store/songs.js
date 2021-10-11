import firebase from "firebase/compat/app";

export default {
  state: {
    currentSong: null,
    controller: false,
  },
  mutations: {
    setSong(state, song) {
      state.currentSong = song;
    },
    changePlay(state, val) {
      state.currentSong.play = val;
    },
    changeController(state, val) {
      state.controller = val;
    },
  },
  actions: {
    async getFirstSong({ getters, commit }, params) {
      let [id, idx = 0] = params;
      const alb = getters.albums.find((alb) => alb.id === id);
      if (idx === alb.tracks.length) {
        idx = 0;
      }
      if (idx < 0) {
        idx = alb.tracks.length - 1;
      }
      const url = await firebase
        .storage()
        .ref(`/${id}/`)
        .child(`${alb.tracks[idx].ref}.mp3`)
        .getDownloadURL();
      const song = {
        albumImg: alb.src,
        ...alb.tracks[idx],
        id: alb.id,
        url,
        play: true,
        desc: alb.title,
      };

      commit("setSong", song);
    },
    async nextSong({ getters, dispatch }) {
      const currentAlb = await dispatch("getCurrentAlb");
      const currentSongIdx = currentAlb.tracks.findIndex(
        (t) => t.ref === getters.song.ref
      );
      await dispatch("getFirstSong", [currentAlb.id, currentSongIdx + 1]);
    },

    async prevSong({ getters, dispatch }) {
      const currentAlb = await dispatch("getCurrentAlb");
      const currentSongIdx = currentAlb.tracks.findIndex(
        (t) => t.ref === getters.song.ref
      );
      await dispatch("getFirstSong", [currentAlb.id, currentSongIdx - 1]);
    },

    getCurrentAlb({ getters }) {
      return getters.albums.find((a) => a.id === getters.song.id);
    },
  },
  getters: {
    song: (s) => s.currentSong,
    controller: (s) => s.controller,
  },
};
