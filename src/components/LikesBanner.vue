<template>
  <router-link to="/likes" tag="div" class="likes-elem cursor-pointer">
    <div class="flex flex-col lpf">
      <div class="flex-1 flex cursor-pointer" style="align-items: end">
        <div
          style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
        >
          <span class="mr-3" v-for="l in likes" :key="l.id + l.ref">
            <span>{{ l.author }}</span>
            <span style="opacity: 0.7">{{
              l.ref[0].toUpperCase() + l.ref.slice(1)
            }}</span>
          </span>
        </div>
      </div>
      <div>
        <h1>Любимі {{ findNeededIdx }} треки</h1>
        <span>2 любимі треки</span>
      </div>
    </div>
    <button
      @click.stop="setActiveAlbum()"
      class="
        rounded-full
        w-12
        font-lg
        h-12
        shadow
        flex
        items-center
        justify-center
        duration-300
        bg-green-600
        text-white
        opacity-0
        absolute
        right-6
        bottom-4
      "
    >
      <v-icon>
        {{
          (
            song
              ? !!(likes.find((t) => t.ref === song.ref) && song.play)
              : false
          )
            ? "mdi-pause"
            : "mdi-play"
        }}</v-icon
      >
    </button>
  </router-link>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["likes", "song", "albums", "controller"]),
    findNeededIdx() {
      return this.albums
        .find((a) => a.id === this.likes[0].id)
        .tracks.findIndex((t) => t.ref === this.likes[0].ref);
    },
  },
  methods: {
    async setActiveAlbum() {
      const isAc = this.song
        ? !!this.likes.find((l) => l.id === this.song.id)
        : false;
      if (!isAc) {
        await this.$store.dispatch("getFirstSong", [
          this.likes[0].id,
          this.findNeededIdx,
        ]);
        this.$store.commit("setPlaylistSongs", []);
      } else if (isAc) {
        this.$store.commit("changeController", !this.controller);
      }
    },
  },
};
</script>

<style lang="scss">
.likes-elem {
  color: #fff;
  font-size: 16px;
  grid-column: span 2;
  height: inherit;
  line-height: 24px;
  background: linear-gradient(149.46deg, #450af5, #8e8ee5 99.16%);
  border-radius: 4px;
  flex: 1;
  isolation: isolate;
  padding: 20px;
  position: relative;
  transition: background-color 0.3s ease;
  width: 100%;
  & button {
    font-size: 30px !important;
  }
  &:hover {
    & button {
      transform: translateY(-25px);
      opacity: 1 !important;
    }
  }
}
</style>
