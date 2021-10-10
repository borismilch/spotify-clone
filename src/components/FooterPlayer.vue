<template>
  <div
    class="
      w-full
      flex
      items-center
      justify-between
      px-3
      bg-sp-lignt
      fixed
      bottom-0
    "
    style="height: 12vh; border-top: 1px solid #282828; z-index: 100"
  >
    <div class="flex items-center">
      <div class="w-12 h-12 mr-4 relative header-previev">
        <div
          v-if="song"
          @click="emitImage(true)"
          class="
            rounded-circle
            bg-sp-dark
            flex
            opacity-0
            duration-200
            justify-center
            items-center
            text-sm
            absolute
            -right-2
            -top-2
            cursor-pointer
            text-white
            p-1
          "
        >
          <v-icon color="#fff">mdi-chevron-up</v-icon>
        </div>
        <img
          :src="song ? song.albumImg : doom"
          alt=""
          class="rounded"
          style="object-fit: cover; width: 50px; height: 50px"
        />
      </div>
      <div style="width: 80px; overflow-hidden; text-overflow: ellipsis">
        <h1 class="text-sm text-white tracking-wide">
          {{ song ? song.title : "Ви нічого не вибрали" }}
        </h1>
        <router-link
          to="/"
          class="text-xs hover:underline text-sp-ligntest tracking-wide"
        >
          {{ song ? song.author : "" }}
        </router-link>
      </div>
      <v-icon
        v-if="song"
        class="text-sp-green icon-hover mx-3 text-lg cursor-pointer"
        >mdi-heart-outline</v-icon
      >
      <v-icon
        v-if="song"
        class="text-sp-ligntest icon-hover text-lg cursor-pointer"
        >mdi-overscan</v-icon
      >
    </div>
    <div class="flex flex-col flex-1 justify-center items-center">
      <div class="flex items-center text-sp-ligntest gap-4">
        <v-icon class="icon-hover">mdi-swap-horizontal</v-icon>

        <v-icon class="icon-hover">mdi-skip-backward</v-icon>
        <v-icon
          @click="musicPlay()"
          class="icon-hover text-4xl duration-200 text-white scaling"
          >{{ isPlay }}</v-icon
        >
        <v-icon class="icon-hover">mdi-skip-forward</v-icon>

        <v-icon @click="refresh()" class="icon-hover"
          >mdi-refresh-circle</v-icon
        >
      </div>
      <div
        class="
          absolute
          w-5/12
          bottom-3
          text-white
          flex
          items-center
          justify-between
        "
      >
        <p>{{ fmtMSS(currentTime || 0) }}</p>
        <p>{{ fmtMSS(song ? song.duration : 0) }}</p>
      </div>
      <div class="w-3/6 relative osobiy mt-4" style="max-width: 550px">
        <input
          @input="track.currentTime = $event.target.value"
          :disabled="!song"
          type="range"
          class="w-full cursor-pointer disabled"
          min="0"
          :max="song ? song.duration : 0"
          id="track"
          :value="currentTime"
        />
      </div>
    </div>
    <div class="flex text-sp-ligntest gap-2 items-center">
      <v-icon class="icon-hover">mdi-playlist-music-outline</v-icon>
      <v-icon icon="laptop-house" class="icon-hover">mdi-cellphone-link</v-icon>
      <div class="w-7">
        <v-icon class="icon-hover" color="#B3B3B3" @click="volume = 0"
          >mdi-{{ vol }}</v-icon
        >
      </div>

      <input
        :disabled="!song"
        type="range"
        name=""
        min="0"
        max="100"
        id="volume"
        v-model.number="volume"
        class="
          disabled
          bg-sp-green
          border-0
          outline-none
          w-24
          tracking-wide
          h-2
          value
          right
        "
      />
    </div>
  </div>
</template>

<script>
import doom from "../assets/music.jpg";
import { mapGetters } from "vuex";
export default {
  props: {
    imageShown: Boolean,
  },
  data: () => ({
    track: null,
    trw: 0,
    doom,
    liked: false,
    volume: 40,
    play: false,
    duration: 0,
    currentTime: 0,
    mousedown: false,
  }),
  watch: {
    volume(val) {
      this.track.volume = val / 100;
    },
    song: {
      deep: true,
      handler(val, oldval) {
        console.log(oldval.id, val.id)
        if (!this.track) {
          this.track = new Audio(val.url);
          this.track.load(); //load the new source
          this.track.play(); //play
          this.play = true
          this.track.addEventListener("timeupdate", this.handleMusicProgress);
          this.$store.commit('changePlay', this.play)
        }
        else if (oldval.id !== val.id && this.track) {
          this.track.setAttribute("src", val.url); //change the source
          this.track.load(); //load the new source
          this.track.play(); //play
          this.play = true
          this.$store.commit('changePlay', this.play)
        } 
        else if (oldval.ref !== val.ref && this.track && oldval.id === val.id ) {
          this.track.setAttribute("src", val.url); //change the source
          this.track.load(); //load the new source
          this.track.play(); //play
          this.play = true
          this.$store.commit('changePlay', this.play)
        } 
      },
    },
    controller () {
      console.log('ddddddvdwd')
      this.musicPlay()
    },
  },
  computed: {
    ...mapGetters(["song", 'controller']),
    vol() {
      return this.volume > 70
        ? "volume-high"
        : this.volume > 45
        ? "volume-medium"
        : this.volume > 0
        ? "volume-low"
        : "volume-mute";
    },
    isPlay() {
      return !this.play
        ? "mdi-play-circle-outline"
        : "mdi-pause-circle-outline";
    },
    
  },

  methods: {
    handleMusicProgress (e) {
      console.log(Math.floor(e.target.currentTime))
      this.currentTime = e.target.currentTime
    },
    emitImage(e) {
      this.$emit("emitImage", e);
    },
    fmtMSS(s) {
      return ((s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s).split(".")[0];
    },
    musicPlay() {
      if (this.song) {
        this.play = !this.play
        if (this.play) { this.track.play() }
        else { this.track.pause() }
        this.$store.commit('changePlay', this.play)
      } 
      else {
        this.$emit("pageMessage", "NO_SONG_SELECTED");
        console.log("jjj");
      }
    },
    refresh() {
      if (this.song) {
        this.track.load();
        this.play ? this.track.play() : this.track.pause();
      } else this.$emit("pageMessage", "NO_SONG_SELECTED");
    },
  },
};
</script>

<style lang="scss">
#volume {
  //-webkit-appearance: none;
  outline: none;
  height: 3px;
  border-radius: 10px;
  background: #2a2a2a;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  &::-moz-range-thumb {
    display: none !important;
  }
}
#volume input::-moz-range-thumb {
  border: 4px solid aqua;
}
#volume input::-moz-range-progress {
  height: 5px;
  background: black !important;
}
#track {
  outline: none;
  height: 5px;
  border-radius: 10px;
  background: #2a2a2a;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
}
.osobiy {
  &:hover {
    .aa {
      background: #1ed760 !important;
      & div {
        opacity: 1 !important;
      }
    }
  }
  ///1ed760
}
</style>

<style lang="scss">
.scaling {
  &:hover {
    transform: scale(0.8);
  }
}
.hovi {
  cursor: pointer;
  &:hover {
    .flex {
      background: #1d8954;
      & div {
        opacity: 1;
      }
    }
  }
}
.rounded-circle {
  border-radius: 50% !important;
}
</style>
