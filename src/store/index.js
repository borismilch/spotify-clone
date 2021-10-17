import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import record from "./records";
import songs from "./songs";
import likes from "./likes";
import create from "./create";
import playlists from "./playlists";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    whatMore: [],
  },
  mutations: {
    setWhatMore(state, whatMore) {
      state.whatMore = whatMore;
    },
  },
  actions: {},
  getters: {
    more: (s) => s.whatMore,
  },
  modules: { auth, record, songs, likes, playlists, create },
});
