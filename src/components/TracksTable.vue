<template>
  <div class="flex flex-col" style="padding: 20px 0px">
    <div
      class="table-head"
      style="margin-bottom: 16px; z-index: 10; position: sticky; top: 56px"
    >
      <slot> </slot>
    </div>
    <ul style="z-index: 20">
      <li
        @click="setActiveAlbum(idx)"
        :class="{
          'li-active': song ? song.id === id && tr.ref === song.ref : false,
        }"
        class="flex justify-beetween relative py-2 px-2 items-center lich"
        v-for="(tr, idx) in tracks"
        :key="idx"
      >
        <v-icon @click.stop="changeActivity(idx)" class="only-hover none">{{
          (song ? song.id === id && tr.ref === song.ref && song.play : false)
            ? "mdi-pause"
            : "mdi-play"
        }}</v-icon>
        <span class="w-6 normal-text index text-center">{{ idx + 1 }}</span>

        <div class="flex flex-col ml-2 flex-1" style="width: 50%">
          <span class="normal-font-lg mb-2">{{ tr.title }}</span>
          <span
            class="
              normal-font
              hover:underline
              font-light
              cursor-pointer
              opacity-90
            "
            >{{ tr.author }}</span
          >
        </div>

        <div class="flex items-center gap-4">
          <v-icon
            @click.stop="
              tr.liked = !tr.liked;
              tr.liked
                ? like([tr.parent, tr.ref])
                : dislike([tr.parent, tr.ref]);
            "
            :style="{ color: tr.liked ? '#1ed760' : '#a7a7a7' }"
            >{{ tr.liked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon
          >
          <span class="normal-font">{{ fmtMSS(tr.duration) }}</span>
          <v-icon class="ubuntu">mdi-dots-horizontal</v-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    scroll: 0,
    play: true,
  }),
  props: {
    id: String,
    tracks: Array,
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    fmtMSS(s) {
      return ((s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s).split(".")[0];
    },
    onScroll() {
      this.scroll = window.top.scrollY;
    },
    async setActiveAlbum(idx) {
      const activeAlb = this.albums.find((a) => a.id === this.$route.params.id);
      if (this.song ? this.song.ref !== activeAlb.tracks[idx].ref : true) {
        await this.$store.dispatch("getFirstSong", [activeAlb.id, idx]);
        this.$store.commit("changePlay", true);
      }
    },
    async changeActivity(idx) {
      if (this.song ? this.song.ref !== this.tracks[idx].ref : true) {
        await this.setActiveAlbum(idx);
        this.$store.commit("setPlaylistSongs", []);
      } else {
        this.play = !this.play;
        this.$store.commit("changeController", this.play);
      }
    },
    async like(params) {
      this.$emit("pageMessage", "USER_LIKED");
      await this.$store.dispatch("like", params);
    },
    async dislike(params) {
      this.$emit("pageMessage", "USER_DISLIKED");
      await this.$store.dispatch("dislike", params);
    },
  },
  computed: {
    ...mapGetters(["song", "albums"]),
  },
};
</script>

<style lang="scss" scoped>
.li-active {
  background: hsla(0, 0%, 100%, 0.07) !important;
  .only-hover {
    display: block !important;
  }
  .index {
    display: none !important;
  }
  .normal-font-lg {
    color: #1ed760;
  }
  .ubuntu {
    opacity: 1 !important;
  }
}
.z-50 {
  z-index: 50 !important;
}
.lay2 {
  background-color: rgb(160, 176, 224);

  height: 232px;
  position: absolute;
  width: 100%;

  border-bottom: 2px solid #727272;
}
.lay3 {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5973739837731968) 2%,
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
.user-avatar {
  z-index: 10;
  width: 232px;
  height: 232px;
  @media (max-width: 969px) {
    width: 192px;
    height: 192px;
  }
}
.shadow-av {
  box-shadow: 5px 5px 40px #242424;
}
.user-profile {
  position: relative;
  align-items: flex-end;
  height: 340px;
  background-color: rgb(160, 176, 224);
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
  padding: 20px 0px 20px 0px;
}
</style>
