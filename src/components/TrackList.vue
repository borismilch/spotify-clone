<template>
  <div class="flex flex-col">
    <slot></slot>
    <ul style="z-index: 10">
      <li
        class="flex justify-beetween relative py-2 px-2 items-center lich"
        :class="{ 'li-active': song ? li.ref === song.ref : false }"
        v-for="(li, idx) in this.$route.meta.player ? tracks : trackShow"
        :key="idx"
        @click="setActiveAlbum(li.ref)"
      >
        <v-icon class="only-hover none" @click="changeActivity(li.ref)">
          {{
            (song ? li.ref === song.ref && song.play : false)
              ? "mdi-pause"
              : "mdi-play"
          }}
        </v-icon>
        <span class="w-6 hbdd normal-text index text-center">{{
          idx + 1
        }}</span>
        <div style="width: 40px" class="mx-4">
          <v-img
            class="h-10 rounded-sm"
            style="width: 40px; height: 40px !important; object-fit: cover"
            :src="li.albumImg"
          ></v-img>
        </div>
        <div class="flex flex-col" style="width: 50%">
          <span class="normal-font-lg mb-2">{{ li.title }}</span>
          <span
            class="
              normal-font
              hover:underline
              font-light
              cursor-pointer
              opacity-90
            "
            >{{ li.author }}</span
          >
        </div>
        <span class="normal-font flex-1">{{ li.desc }}</span>
        <div style="width: 300px" v-if="timed" class="normal-font flex-1">
          {{ new Date() | date }}
        </div>
        <div class="flex items-center gap-4">
          <v-icon
            @click.stop="
              li.liked = !li.liked;
              li.liked
                ? like([li.parent, li.ref])
                : dislike([li.parent, li.ref]);
            "
            :style="{ color: li.liked ? '#1ed760' : '#a7a7a7' }"
            >{{ li.liked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon
          >
          <span class="normal-font">{{ fmtMSS(li.duration) }}</span>
          <v-icon class="ubuntu">mdi-dots-horizontal</v-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fmtMSS } from "../utils/secs.func";
import doom from "../assets/doom.jpg";
export default {
  data: () => ({
    doom,
  }),
  computed: {
    ...mapGetters(["song", "albums"]),
    trackShow() {
      return this.trackList.slice(0, 4);
    },
  },
  methods: {
    fmtMSS,
    async setActiveAlbum(ref) {
      const activeAlb = this.albums.find((a) => a.id === this.song.id);
      let idx = activeAlb.tracks.findIndex((t) => t.ref === ref);
      if (this.song ? this.song.ref !== activeAlb.tracks[idx].ref : true) {
        await this.$store.dispatch("getFirstSong", [activeAlb.id, idx]);
        this.$store.commit("changePlay", true);
      }
    },
    async changeActivity(ref) {
      let idx = this.tracks.findIndex((t) => t.ref === ref);
      if (this.song.ref !== this.tracks[idx].ref) {
        await this.setActiveAlbum(idx);
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
  props: {
    tracks: Array,
    timed: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.li-active {
  .only-hover {
    display: block !important;
  }
  .index {
    display: none !important;
  }
  .normal-font-lg,
  .hbdd {
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
  padding: 6px 32px 24px 32px;
}
</style>
