<template>
  <div class="relative">
    <div class="px-6 py-3 flex justify-between items-center mr-5">
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
        "
      >
        See more
      </h2>
    </div>
    <div class="flex w-full flex-nowrap gap-6">
      <div
        v-for="(rec, idx) in itemsToShow"
        class="relative flex-1 bhover"
        :key="rec.src.slice(20) + idx"
      >
        <router-link
          :to="'/detail/' + rec.id"
          style="min-height: 294px"
          class="p-2 gover cursor-pointer relative"
          :class="{ 'active-play': song ? song.id === rec.id : false }"
        >
          <div class="bg-sp-lignt w-full h-auto px-4 py-4 relative">
            <img
              style="object-fit: cover; min-height: 190px"
              :src="rec.src"
              class="h-auto w-full shad mb-2"
              :class="{ 'rounded-full': isAuthors }"
              alt=""
            />
            <h1 class="text-sm mt-4 font-semibold text-white tracking-wider">
              {{ rec.title }}
            </h1>
            <h2 class="text-xs text-sp-ligntest tracking-wider">
              {{ rec.artist }}
            </h2>
          </div>
        </router-link>
        <button
          @click="setActiveAlbum(idx)"
          class="
            rounded-full
            w-10
            h-10
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
          <v-icon>{{ rec.active ? "mdi-pause" : "mdi-play" }}</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import images from "../utils/images";
export default {
  props: {
    template: Array,
    title: String,
    isAuthors: Boolean,
  },
  data: () => ({
    images,
    screenWidth: window.innerWidth,
  }),
  computed: {
    ...mapGetters(["albums", "song"]),
    itemsToShow() {
      return this.albums.filter((i, idx) => idx < this.numToShow);
    },
    numToShow() {
      if (this.screenWidth >= 1540) return 6;
      else if (this.screenWidth >= 1240) return 5;
      else if (this.screenWidth >= 1040) return 4;
      else if (this.screenWidth >= 840) return 3;
      else if (this.screenWidth >= 640) return 2;
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
      console.log(this.screenWidth);
    },
    async setActiveAlbum(idx) {
      if (this.song !== this.albums[idx]) {
        await this.$store.dispatch("getFirstSong", [
          this.itemsToShow[idx].id,
          0,
        ]);
      }
    },
  },
};
</script>

<style lang="scss">
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
      transform: translateY(-80px) !important;
    }
  }
}
</style>
