<template>
  <section>
    <div class="mt-40">
      <h1 class="que-title">Очередь</h1>

      <Loader v-if="loading" />
      <div v-else>
        <PlayList @pageMessage="$emit('pageMessage', $event)" :tracks="[song]">
          <div>
            <h2 class="que-subtitle">Сейчас играет:</h2>
          </div>
        </PlayList>

        <div v-if="slicedTracks.length">
          <div>
            <h2 class="que-subtitle">Далі по списку</h2>
          </div>
          <PlayList
            @pageMessage="$emit('pageMessage', $event)"
            :tracks="playListOn.length ? slicedTracksP : slicedTracks"
          >
            <div></div>
          </PlayList>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PlayList from "../components/TrackList.vue";
import Loader from "../components/Loader.vue";
import { mapGetters } from "vuex";
export default {
  metaInfo: { title: `Queue | Builofy ` },
  components: { PlayList, Loader },
  data: () => ({
    loading: true,
  }),
  mounted() {
    this.$emit("changeStyle", "#2a2a2a");
    this.$emit("changeContent", "Очередь");
    this.loading = false;
  },
  computed: {
    ...mapGetters(["song", "albums", "playlists", "playListOn"]),
    curAlb() {
      return this.albums.find((a) => a.id === this.song.id);
    },
    currentTracks() {
      return this.song ? this.curAlb.tracks : [];
    },
    playlistsTracks() {
      return this.curAlb.tracks.map((t) => {
        const alb = this.albums.find((a) => a.id === t.parent);
        return { ...t, albumImg: alb.src, desc: this.curAlb.title };
      });
    },
    slicedTracks() {
      return this.song
        ? this.currentTracks
            .slice(
              this.currentTracks.findIndex((t) => t.ref === this.song.ref) + 1
            )
            .map((t) => ({
              ...t,
              albumImg: this.curAlb.src ?? this.curAlb.img,
              desc: this.curAlb.title,
              creator: this.curAlb.creator,
            }))
        : [];
    },
    slicedTracksP() {
      return this.playListOn
        ? this.playListOn.slice(
            this.playListOn.findIndex(
              (t) => t.ref === this.song.ref && t.parent === this.song.id
            ) + 1
          )
        : [];
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 60px 15px 0px 30px;
}
.mt-40 {
  margin-top: 40px;
}
.que-title {
  color: rgb(255, 255, 255);
  margin-bottom: 16px;

  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 28px;
  text-transform: none;
}
.que-subtitle {
  color: rgb(179, 179, 179);

  font-size: 16px;
  font-weight: 700;
  letter-spacing: normal;
  line-height: 24px;
  text-transform: none;
}
</style>
