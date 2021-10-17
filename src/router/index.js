import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/compat/app";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { auth: true },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    meta: { auth: false },
    component: () => import("../views/Auth.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { auth: false },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/create/:id",
    name: "Create",
    meta: { auth: true, player: true },
    component: () => import("../views/Create.vue"),
  },
  {
    path: "/likes",
    name: "Likes",
    meta: { auth: true, player: true },
    component: () => import("../views/Likes.vue"),
  },
  {
    path: "/user/:id",
    name: "User",
    meta: { auth: true },
    component: () => import("../views/User.vue"),
  },
  {
    path: "/search",
    name: "Search",
    meta: { auth: true, searchField: true, player: true },
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/detail/:id",
    name: "Detail",
    meta: { auth: true, player: true },
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/playlist",
    name: "PlayList",
    meta: { auth: true, player: true },
    component: () => import("../views/PlayList.vue"),
  },
  {
    path: "/genre/:genre",
    name: "Genre",
    meta: { auth: true },
    component: () => import("../views/Genre.vue"),
  },
  {
    path: "/collection/create/:id",
    name: "CreateAlbum",
    meta: { auth: true, collection: true },
    component: () => import("../views/CreateAlbum.vue"),
  },
  {
    path: "/collection/playlists",
    name: "CollectionP",
    meta: { auth: true, collection: true },
    component: () => import("../views/Lib.vue"),
  },
  {
    path: "/collection/albums",
    name: "CollectionA",
    meta: { auth: true, collection: true },
    component: () => import("../views/UsersAlbums.vue"),
  },
  {
    path: "/showmore",
    name: "ShowMore",
    meta: { auth: true },
    component: () => import("../views/ShowMore.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiredAuth = to.matched.some((record) => record.meta.auth);
  if (requiredAuth && !currentUser) {
    next("/auth?message=noUser");
  } else next();
});

export default router;
