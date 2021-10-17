import firebase from "firebase/compat/app";

export default {
  state: {
    user: null,
    users: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearInfo(state) {
      state.user = null;
    },
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async regUser({ dispatch, commit }, form) {
      console.log(firebase.auth);
      await firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password);
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/info`)
        .set({
          ...form,
          id: uid,
          avatar:
            "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
        });
      console.log(uid);
      commit("setUser", {
        ...form,
        id: uid,
        avatar:
          "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
      });
    },
    async authUser({ dispatch, commit }, form) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password);
      const uid = await dispatch("getUid");
      const user = (
        await firebase.database().ref(`/users/${uid}/info`).once("value")
      ).val();
      commit("setUser", user);
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    },
    async changeProfile({ dispatch, commit }, updatedUser) {
      console.log("ddd");
      const uid = await dispatch("getUid");
      await firebase
        .database()
        .ref(`/users/${uid}/info`)
        .update({ ...updatedUser });
      commit("setUser", updatedUser);
      await dispatch("fetchUsers");
    },
    getUid() {
      return firebase.auth().currentUser.uid || null;
    },
    async fetchUsers({ commit }) {
      let users = (await firebase.database().ref("/users").once("value")).val();
      users = Object.keys(users).map((key) => ({
        ...users[key],
        ...users[key].info,
      }));
      commit("setUsers", users);
    },
  },
  getters: {
    user: (s) => s.user,
    users: (s) => s.users,
  },
};
