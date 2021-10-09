import music from "./music";
import albums from "./albums";
import store from "vuex";
let updatedAlbums;

updatedAlbums = albums.map((alb) => ({
  ...alb,
  tracks: alb.tracks
    .filter((t) => !!music[t.ref])
    .map((t) => ({
      ...t,
      duration: music[t.ref].duration,
      title: t.ref[0].toUpperCase() + t.ref.slice(1),
      author: store.mapState("user").name,
    })),
}));

export default updatedAlbums;
