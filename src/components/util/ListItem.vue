<template>
  <li
    @click="setActiveAlbum(idx)"
    :class="{
      'li-active': song
        ? song.id === tr.parent &&
          tr.ref === song.ref &&
          tr.title === song.title
        : false,
    }"
    class="flex justify-beetween relative py-2 px-2 items-center lich"
  >
    <v-icon @click.stop="changeActivity(idx)" class="only-hover none">{{
      (
        song
          ? song.id === tr.parent &&
            tr.ref === song.ref &&
            tr.title === song.title &&
            song.play
          : false
      )
        ? "mdi-pause"
        : "mdi-play"
    }}</v-icon>
    <span class="w-6 normal-text index text-center">{{ idx + 1 }}</span>

    <div class="flex flex-col ml-2 flex-1" style="width: 50%">
      <span class="normal-font-lg mb-2">{{ tr.title }}</span>
      <span
        class="normal-font hover:underline font-light cursor-pointer opacity-90"
        >{{ tr.author }}</span
      >
    </div>
    <span style="flex: 0.492">{{ tr.album }}</span>
    <div class="flex items-center gap-4">
      <span class="normal-font">{{ fmtMSS(tr.duration) }}</span>
      <v-icon class="ubuntu" @click.stop="dropdown = true"
        >mdi-dots-horizontal</v-icon
      >

      <div
        class="absolute z-50"
        style="width: 180px; transform: translate(-50%, -50px)"
      >
        <ul
          v-if="dropdown"
          @click.stop="dropdown = false"
          class="absolute p-1 bg-sp-lignt w-full rounded mt-1 font-bold z-50"
        >
          <li class="dropdown-li z-50" @click="$emit('removeItem')">
            Видалити
          </li>
          <li class="dropdown-li z-50" @click="$emit('changeItem')">
            Перенести у доріжку
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dropdown: false,
  }),
  props: {
    id: String,
    tr: Object,
    idx: Number,
    tracks: Array,
    album: Object,
  },
  methods: {
    fmtMSS(s) {
      return ((s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s).split(".")[0];
    },
    async setActiveAlbum(idx) {
      this.dropdown = false;

      if (
        this.song
          ? (this.song.ref !== this.album.tracks[this.idx].ref ||
              this.song.title !== this.album.tracks[this.idx].title) &&
            "liked" in this.tr
          : true
      ) {
        await this.$store.dispatch("getFirstSong", [this.tr.parent, this.idx]);
        this.$store.commit("changePlay", true);
        console.log(this.tr.parent, this.idx);
      } else if (
        this.song
          ? this.song.ref !== this.album.tracks[idx].ref ||
            this.song.title !== this.album.tracks[idx].title
          : true
      ) {
        await this.$store.dispatch("getPreviewSong", [
          this.album,
          idx,
          this.album.tracks[idx].audio,
        ]);
        this.$store.commit("changePlay", true);
      }
    },
    async changeActivity(idx) {
      if (
        this.song
          ? this.song.ref !== this.tracks[idx].ref ||
            this.song.title !== this.album.tracks[idx].title
          : true
      ) {
        await this.setActiveAlbum(idx);
        this.$store.commit("setPlaylistSongs", []);
      } else {
        this.play = !this.play;
        this.$store.commit("changeController", this.play);
      }
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
    color: #1ed760;
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

.prof-text {
  font-weight: 700;
  font-size: 12px;
  margin-top: 4px;
  text-transform: uppercase;
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
