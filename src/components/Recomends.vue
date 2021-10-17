<template>
  <div class="relative">
    <div class="px-6 my-5 flex justify-between items-center mr-5">
      <h1 class="text-2xl font-bold text-white tracking-wider hover:underline">
        {{ title }}
      </h1>
      <h2
        v-if="template.length > itemsToShow.length"
        class="
          text-xs text-sp-ligntest
          uppercase
          font-extrabold
          tracking-wider
          hover:underline
          cursor-pointer
        "
        @click.stop="
          $store.commit('setWhatMore', template);
          $router.push('/showmore');
        "
      >
        See more
      </h2>
    </div>
    <div class="search-grid gap-6">
      <AlbumCard
        v-for="(rec, idx) in itemsToShow"
        :key="rec.src.slice(20) + idx"
        :rec="rec"
        :idx="idx"
        :group="group"
      >
      </AlbumCard>
    </div>
  </div>
</template>

<script>
import AlbumCard from "./AlbumCard.vue";
import { mapGetters } from "vuex";
import images from "../utils/images";
export default {
  props: {
    template: Array,
    title: String,
    group: String,
  },
  data: () => ({
    play: true,
    images,
    screenWidth: window.innerWidth,
  }),
  computed: {
    ...mapGetters(["albums", "song", "controller"]),
    itemsToShow() {
      return this.template.filter((i, idx) => idx < this.numToShow);
    },
    numToShow() {
      if (this.screenWidth >= 1340) return 6;
      else if (this.screenWidth >= 1140) return 5;
      else if (this.screenWidth >= 870) return 4;
      else if (this.screenWidth >= 740) return 3;
      else if (this.screenWidth >= 540) return 2;
      else if (this.screenWidth >= 440) return 1;
      else return 0;
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchAlbums");
    window.addEventListener("resize", this.setSize);
  },

  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    setSize() {
      this.screenWidth = window.innerWidth;
    },
  },
  components: {
    AlbumCard,
  },
};
</script>

<style lang="scss" scoped>
.search-grid {
  grid-gap: 24px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
.shad {
  box-shadow: 3px 3px 30px rgba(0, 0, 0, 0.603);
}
.z-10 {
  z-index: 10 !important;
}
.gover {
  transition: all 0.2s ease;
}
.bhover {
  &:hover {
    .rounded-full {
      cursor: pointer;
      opacity: 1 !important;
      transform: translateY(-80px);
    }
  }
}
.active-play {
  & div {
    background: hsla(0, 0%, 100%, 0.1);
  }
  .bhover {
    & button {
      cursor: pointer;
      opacity: 1 !important;
      transform: translateY(-100px) !important;
    }
  }
}
</style>
