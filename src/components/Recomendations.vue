<template>
  <div class="relative">
    <div class="lay"></div>
    <div
      class="relative"
      style="
        margin-bottom: 24px;
        height: 302px;
        padding: 32px;
        display: flex;
        align-items: center;
        border-bottom: 2px solid blue;
      "
      :style="{ 'background-color': bgCol }"
    >
      <div class="flex-1" style="z-index: 40">
        <h1 class="rec-title ml-2" style="margin-bottom: 16px">
          Ранок буде добрим!
        </h1>
        <div class="rec-greed">
          <div
            class="relative rec-item"
            v-for="(r, idx) in borderedItems"
            :key="r.scr + idx.toString()"
          >
            <router-link
              :to="'/detail/' + r.id"
              class="flex items-center overflow-hidden"
            >
              <img
                :src="r.src"
                style="
                  object-fit: cover;
                  height: 80px;
                  width: 80px;
                  border-radius: 6px;
                  box-shadow: 8px 0px 25px rgba(0, 0, 0, 0.7);
                "
                alt=""
              />
              <div style="padding: 16px">
                <span class="flex-1">{{ r.title }}</span>
              </div>
            </router-link>
            <div
              @click="setActiveAlbum(r.id)"
              class="
                rec-play
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
              <v-icon>mdi-play</v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import analyze from "rgbaster";
import images from "../utils/images";
export default {
  data: () => ({
    images,
    bgCol: "rgb(207, 214, 219)",
  }),
  computed: {
    ...mapGetters(["albums", "song"]),
    borderedItems() {
      return this.albums.slice(0, 4);
    },
  },
  mounted() {
    this.$emit("styleChanged", "rgb(27, 24, 29");
  },
  methods: {
    analyze,
    async setActiveAlbum(id) {
      if (this.song ? this.song.id !== id : true) {
        await this.$store.dispatch("getFirstSong", [id, 0]);
      }
    },
  },
};
</script>

<style lang="scss">
.rec-play {
  box-shadow: 4px 4px 6px rgb(34, 32, 32);
}
.rec-item {
  height: 80px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  transition: background-color 0.3s ease;
  align-items: center;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    .rec-play {
      opacity: 1 !important;
    }
  }
}

.lay {
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
  background: rgba(18, 18, 18, 0.6);
  background: linear-gradient(
    180deg,
    rgba(25, 24, 24, 0.7054692218684349) 20%,
    rgba(18, 18, 18, 1) 100%
  );
}
.rec-greed {
  row-gap: 16px;
  grid-auto-rows: auto;
  grid-template-rows: 1fr;
  overflow-y: hidden;
  grid-gap: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: 1409px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 649px) {
    grid-template-columns: 1fr;
  }
}
</style>
<style>
.rec-title {
  color: #fff;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 36px;
  text-transform: none;
}
</style>
