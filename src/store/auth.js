import firebase from "firebase/compat/app";

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearInfo(state) {
      state.user = null;
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
    },
    getUid() {
      return firebase.auth().currentUser.uid || null;
    },
  },
  getters: {
    user: (s) => s.user,
  },
};
