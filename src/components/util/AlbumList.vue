<template>
  <div class="flex flex-col">
    <slot></slot>
    <ul style="z-index: 10" v-if="albums.length">
      <li
        class="flex justify-beetween relative py-2 px-2 items-center lich"
        :class="{
          'li-active': song
            ? song.album === li.title && song.id === li.id
            : false,
        }"
        v-for="(li, idx) in albums"
        :key="li.id"
        @click="$router.push('/detail/' + li.id)"
      >
        <v-icon
          class="only-hover none"
          @click.stop="changeActivity(li.tracks[0].ref, li.id, li.title, li)"
        >
          {{
            (
              song
                ? song.album === li.title && song.id === li.id && song.play
                : false
            )
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
            :src="li.src"
          ></v-img>
        </div>
        <div class="flex flex-col flex-1">
          <span class="normal-font-lg mb-2">{{ li.title }}</span>
          <span
            class="
              normal-font
              hover:underline
              font-light
              cursor-pointer
              opacity-90
            "
            style="color: #b3b3b3"
            >{{ li.description || "..." }}</span
          >
        </div>
        <span class="normal-font" style="color: #b3b3b3; flex: 0.3 0 auto">{{
          li.desc
        }}</span>
        <div class="flex items-center gap-4 ml-10">
          <v-icon class="ubuntu" style="opacity: 1 !important"
            >mdi-dots-horizontal</v-icon
          >
        </div>
      </li>
    </ul>
    <slot v-else name="empty"></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fmtMSS } from "../../utils/secs.func";

export default {
  computed: {
    ...mapGetters(["song", "controller"]),
    trackShow() {
      return this.tracks.slice(4);
    },
  },

  methods: {
    fmtMSS,
    async setActiveAlbum(ref, id, album, activeAlb) {
      let idx = activeAlb.tracks.findIndex((t) => t.ref === ref);
      if (
        this.song
          ? this.song.ref !== activeAlb.tracks[idx].ref ||
            this.song.album !== album
          : true
      ) {
        console.log(id, idx, ref, album);
        await this.$store.dispatch("getFirstSong", [activeAlb.id, idx]);
        this.$store.commit("changePlay", true);
      }
    },
    async changeActivity(ref, id, album, activeAlb) {
      let idx = activeAlb.tracks.findIndex((t) => t.ref === ref);
      console.log(idx);
      if (this.song ? this.song.id !== activeAlb.id : true) {
        await this.setActiveAlbum(ref, id, album, activeAlb);
      } else {
        this.$store.commit("changeController", !this.controller);
      }
    },
  },
  props: {
    albums: Array,
  },
};
</script>

<style lang="scss" scoped>
.li-active {
  background: hsla(0, 0%, 100%, 0.1);
  .only-hover {
    display: block !important;
    color: #1ed760;
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
