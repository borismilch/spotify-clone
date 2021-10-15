<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <GoodMorning @styleChanged="$emit('changeStyle', $event)" />
      <div style="padding: 0px 32px 0px 32px; gap: 16px" class="flex flex-col">
        <Recomends
          :title="'Recent Songs'"
          :template="albums"
          :isAuthors="false"
        />
        <Recomends :title="'New songs'" :template="albums" :isAuthors="false" />
      </div>
    </div>
  </div>
</template>

<script>
import music from "../utils/music";
import albs from "../utils/albums";
import Loader from "../components/Loader.vue";
import { mapGetters } from "vuex";
import Recomends from "../components/Recomends.vue";
import GoodMorning from "../components/Recomendations.vue";
export default {
  components: {
    Recomends,
    GoodMorning,
    Loader,
  },
  computed: { ...mapGetters(["albums", "user"]) },
  data: () => ({
    albs,
    music,
    loading: true,
  }),
  // mounted() {
  //   setTimeout(async () => {
  //     const updatedAlbums = this.albs.map((alb) => ({
  //       ...alb,
  //       tracks: alb.tracks
  //         .filter((t) => !!music[t.ref])
  //         .map((t) => ({
  //           ...t,
  //           duration: this.music[t.ref].duration,
  //           title: t.ref[0].toUpperCase() + t.ref.slice(1),
  //           author: this.user.name,
  //         })),
  //     }));

  //   }, 300);
  // },
  mounted() {
    setTimeout(async () => {
      await this.$store.dispatch("fetchPlaylists");
      this.loading = false;
    }, 200);
  },
};
</script>

<style lang="scss">
body {
  background-color: #121212 !important;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #d1d1d1 !important;
  margin-top: -4px;
}
.lay {
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
  background: rgba(18, 18, 18, 0.5);
  background: linear-gradient(
    180deg,
    rgba(25, 24, 24, 0.6054692218684349) 2%,
    rgba(18, 18, 18, 1) 100%
  );
}
</style>
