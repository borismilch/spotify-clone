import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import record from "./records";
import songs from "./songs";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, record, songs },
});
