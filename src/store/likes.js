import firebase from "firebase/compat/app";

export default {
  state: { likes: [] },
  mutations: {},
  actions: {
    async like({ dispatch }, params) {
      const uid = await dispatch("getUid");
      let [id, ref] = params;
      await firebase
        .database()
        .ref(`/users/${uid}/likes`)
        .push({ id, ref, date: new Date() });
      await dispatch("fetchAlbums");
    },
    async dislike({ dispatch }, params) {
      const uid = await dispatch("getUid");
      let [id, ref] = params;
      const likes = await dispatch("getLikes");

      const key = Object.keys(likes).find(
        (key) => likes[key].id === id && likes[key].ref === ref
      );
      console.log(key, ref);
      await firebase.database().ref(`/users/${uid}/likes/${key}`).remove();
      await dispatch("fetchAlbums");
    },
    async getLikes({ dispatch }) {
      const uid = await dispatch("getUid");
      const likes = (
        await firebase.database().ref(`/users/${uid}/likes`).once("value")
      ).val();
      return likes ? likes : [];
    },
  },
  getters: {},
};
