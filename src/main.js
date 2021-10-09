import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import loaderMixin from "./mixins/loading.mixin";

import firebase from "firebase/compat";
const firebaseConfig = {
  apiKey: "AIzaSyAqXbv8P9IAuMjFKVe_uVBe4YmvcTZTiqQ",
  authDomain: "buzzbizz-ce269.firebaseapp.com",
  databaseURL: "https://buzzbizz-ce269-default-rtdb.firebaseio.com",
  projectId: "buzzbizz-ce269",
  storageBucket: "buzzbizz-ce269.appspot.com",
  messagingSenderId: "192806739728",
  appId: "1:192806739728:web:f6fd48b9673643cf2fcf95",
};

firebase.initializeApp(firebaseConfig);

import "./css/style.css";
Vue.config.productionTip = false;
Vue.mixin("loader", loaderMixin);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
