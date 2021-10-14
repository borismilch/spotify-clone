<template>
  <div>
    <Loader v-if="loading" />
    <div v-show="!loading">
      <div class="flex user-profile" :style="{ 'background-color': backColor }">
        <div class="lay"></div>
        <div class="user-credentials flex cursor-pointer" style="z-index: 10">
          <div class="user-avatar" style="position: relative">
            <v-img
              width="100%"
              height="100%"
              :src="current.src"
              class="shadow-av"
              alt=""
            />
          </div>
          <div class="user-info flex flex-col mx-6 justify-end mb-4">
            <span class="detail-text">Альбом</span>
            <h1 class="detail-title font-extrabold">{{ current.title }}</h1>
            <div class="flex"></div>
          </div>
        </div>
      </div>
      <div
        class="lay2 z-10 absolute"
        :style="{ 'background-color': backColor }"
      ></div>
      <div class="lay3 z-10 absolute"></div>
      <div style="z-index-50">
        <span class="dots-w">...</span>
      </div>
      <div class="z-10" style="padding: 0px 32px 0px 32px">
        <TrackTable
          :deleteActivity="true"
          @pageMessage="$emit('pageMessage', $event)"
          :id="current.id"
          :tracks="current.tracks"
        >
          <div>
            <div class="flex justify-beetween mt-1 items-center">
              <div class="flex flex-1 items-center gap-3">
                <span class="list-title">#</span>
                <span class="normal-font flex-1">Назва</span>
              </div>
              <span class="more" style="width: 80px">
                <v-icon style="font-size: 28px">mdi-clock</v-icon>
              </span>
            </div>
          </div>
        </TrackTable>
        <Recomends
          :title="'Відкриті плейлісти'"
          :template="albums"
          :isAuthors="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Recomends from "../components/Recomends.vue";
import TrackTable from "../components/TracksTable.vue";
import Loader from "../components/Loader.vue";
import analyze from "rgbaster";

import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["albums", "user"]),
    current() {
      return this.albums.find((a) => a.id === this.$route.params.id);
    },
    trackShow() {
      return this.trackList.slice(0, 4);
    },
  },
  components: { Loader, TrackTable, Recomends },
  data: () => ({
    loading: true,
    backColor: "",
  }),
  methods: {
    fmtMSS(s) {
      return ((s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s).split(".")[0];
    },
    async changeStyle() {
      this.loading = true;
      const color = (await analyze(this.current.src))[0].color;
      this.backColor = color;
      this.$emit("changeStyle", this.backColor);
      this.$emit("changeContent", this.current.title);
      setTimeout(() => (this.loading = false));
    },
  },
  async mounted() {
    await this.changeStyle();
  },
  watch: {
    "current.id"() {
      this.changeStyle();
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-text {
  font-weight: 700;
  font-size: 12px;
  margin-top: 4px;
  text-transform: uppercase;
}
.detail-title {
  padding: 0.08em 0px;
  visibility: visible;
  width: 100%;
  font-size: 48px;
  line-height: 48px;
}

.z-50 {
  z-index: 50 !important;
}
.lay2 {
  height: 232px;
  position: absolute;
  width: 100%;

  border-bottom: 2px solid #727272;
}
.lay3 {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.673739837731968) 2%,
    rgba(18, 18, 18, 1) 100%
  );
  height: 232px;
  position: absolute;
  width: 100%;
}
.font-light {
  font-weight: 300 !important;
}
.none {
  display: none;
}
.normal-font-lg {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 16px;
  text-overflow: ellipsis;
  text-transform: none;
}
.ubuntu {
  opacity: 0;
}
.lich {
  cursor: pointer;
  &:hover {
    background: hsla(0, 0%, 100%, 0.07);
    .ubuntu {
      opacity: 1 !important;
    }
    .index {
      display: none;
    }
    .only-hover {
      display: block;
    }
  }
}
</style>

<style lang="scss" scoped>
.w-10 {
  width: 40px;
}
.profile-overlay {
  opacity: 0;
  transition: all 0.2s ease;
}
.user-avatar {
  z-index: 10;
  width: 232px;
  height: 232px;
  @media (max-width: 969px) {
    width: 192px;
    height: 192px;
  }
  &:hover {
    .profile-overlay {
      opacity: 1;
    }
  }
}
.shadow-av {
  box-shadow: 5px 5px 40px #242424;
}
.user-profile {
  position: relative;
  align-items: flex-end;
  height: 340px;
}
.lay {
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
  background: linear-gradient(
    180deg,
    rgba(233, 20, 41, 0) 2%,
    rgba(0, 0, 0, 0.60773812943146) 100%
  );
}
.user-credentials {
  padding: 0px 0px 20px 30px;
}
.prof-text {
  font-weight: 700;
  font-size: 12px;
  margin-top: 4px;
  text-transform: uppercase;
}
.prof-title {
  padding: 0.08em 0px;
  visibility: visible;
  width: 100%;
  line-height: 96px;
  font-size: 96px;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 96px;
  text-transform: none;
}
.spaan {
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 16px;
  text-transform: none;
}
.dots-w {
  padding: 10px 10px 24px 36px;
  font-size: 38px;
  position: relative;
}
.list-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 35px;
  text-transform: none;
}
.normal-font {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 16px;
  text-transform: none;
  text-overflow: ellipsis;
}
.more {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 16px;
  text-transform: uppercase;
}
.content-spacing {
  padding: 6px 32px 24px 32px;
}
</style>
