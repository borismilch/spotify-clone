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
    path: "/create",
    name: "Create",
    meta: { auth: true },
    component: () => import("../views/Create.vue"),
  },
  {
    path: "/lib",
    name: "Lib",
    meta: { auth: true },
    component: () => import("../views/Lib.vue"),
  },
  {
    path: "/likes",
    name: "Likes",
    meta: { auth: true, player: true },
    component: () => import("../views/Likes.vue"),
  },
  {
    path: "/user",
    name: "User",
    meta: { auth: true },
    component: () => import("../views/User.vue"),
  },
  {
    path: "/search",
    name: "Search",
    meta: { auth: true },
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
