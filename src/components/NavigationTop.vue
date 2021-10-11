<template>
  <div
    id="navBar"
    ref="navBar"
    class="
      z-50
      duration-200
      fixed
      w-full
      top-0
      py-3
      px-6
      flex
      items-center
      justify-between
    "
    :style="{
      height: '56px',
      background: scroll < 60 ? 'transparent' : bgCol,
      'max-width': '1280px',
    }"
  >
    <div
      class="lay duration-200"
      :style="{ opacity: scroll > 60 ? 0.4 : 0 }"
    ></div>
    <div class="flex gap-6 items-center" style="z-index: 10">
      <div class="flex gap-4">
        <button
          @click="$router.go(-1)"
          class="
            rounded-full
            opacity-90
            text-white text-xl
            bg-black
            w-8
            h-8
            flex
            items-center
            justify-center
          "
        >
          <v-icon>mdi-chevron-left</v-icon>
        </button>

        <button
          @click="$router.go(+1)"
          class="
            rounded-full
            opacity-90
            text-white text-xl
            bg-black
            w-8
            h-8
            flex
            items-center
            justify-center
          "
        >
          <v-icon>mdi-chevron-right</v-icon>
        </button>
      </div>
      <Fade>
        <div
          v-if="scroll > 60 && this.$route.meta.player"
          class="flex gap-3 items-center"
        >
          <div
            @click="setActiveAlbum"
            style="width: 40px; height: 40px"
            class="
              rounded-full
              shadow
              flex
              text-bold
              items-center
              justify-center
              duration-300
              bg-green-600
              text-white
              p-2
              player
              hov-scale
            "
          >
            <v-icon class="text-xl">{{
              (song ? song.id === $route.params.id && song.play : false)
                ? "mdi-pause"
                : "mdi-play"
            }}</v-icon>
          </div>
          <span class="spa">{{ navContent }}</span>
        </div>
      </Fade>
    </div>
    <UserDropdown />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Fade from "../components/util/transition.vue";
import UserDropdown from "./UserDropdown.vue";
export default {
  props: {
    bgCol: String,
    navContent: String,
  },
  data: () => ({
    scroll: 0,
  }),
  components: { UserDropdown, Fade },
  computed: {
    ...mapGetters(["song", "albums", "controller"]),
    isScrolled() {
      return this.$refs.navBar.parent;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      this.scroll = window.top.scrollY;
    },
    async setActiveAlbum() {
      const activeAlb = this.albums.find((a) => a.id === this.$route.params.id);
      const isAc = !!activeAlb.tracks.find((t) => t.ref === this.song.ref);
      console.log(isAc);
      if (this.song ? this.song.id !== this.$route.params.id : true) {
        await this.$store.dispatch("getFirstSong", [activeAlb.id, 0]);
      }
      if (this.song ? this.song.id === this.$route.params.id && isAc : false) {
        this.$store.commit("changeController", !this.controller);
      }
    },
  },
};
</script>

<style lang="scss">
.shadow {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}
.hov-scale {
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
}
.spa {
  padding: 0.08em 0px;
  visibility: visible;
  width: 100%;
  font-size: 32px;
  line-height: 48px;
  font-weight: 600;
  opacity: 0.8;
}
</style>
