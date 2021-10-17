<template>
  <div class="relative flex-1 bhover">
    <router-link
      :to="'/user/' + user.id"
      style="min-height: 268px"
      class="gover cursor-pointer relative"
      :class="{
        'active-play': song
          ? song.id === albums.find(a => a.creator === user.id).id && song.group === group
          : false,
      }"
    >
      <div class="bg-sp-lignt w-full h-auto px-4 py-4 relative">
        <img
          style="object-fit: cover; height: 152px; max-height: 200px"
          :src="user.avatar"
          class="h-auto w-full shad mb-2 rounded-circle"
          alt=""
        />
        <h1
          style="text-overflow: ellipsis"
          class="text-sm mt-4 font-semibold text-white"
        >
          {{ user.name }}
        </h1>
        <h2
          style="
            text-overflow: ellipsis;
            white-space: wrap;
            overflow: hidden;
            width: 100px;
          "
          class="text-xs text-sp-ligntest my-2"
        >
          {{ user.name }}
        </h2>
      </div>
    </router-link>
    <button
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
      @click="setActiveAlbum"
    >
      <v-icon>{{
      (song ? (song.id === albums.find(a => a.creator === user.id).id && song.play) : false) ?
      'mdi-pause' : "mdi-play" }}</v-icon>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({}),
  props: {
    user: Object,
    idx: Number,
    group: String,
  },
  computed: {
    ...mapGetters(["albums", "song", "controller"]),
    isAlbum() {
      return !!this.albums.find((a) => a.id === this.user.id);
    },
  },
  methods: {
    async setActiveAlbum() {
      if (
        this.song
          ? this.song.id !==
              (this.albums.find((a) => a.creator === this.user.id) || {}).id ||
            this.song.group !== this.group
          : true
      ) {
        await this.$store.dispatch("getFirstSong", [
          this.albums.find((a) => a.creator === this.user.id).id,
          0,
          "",
          this.group,
        ]);
        this.$store.commit("setPlaylistSongs", []);
      } else {
        this.$store.commit("changeController", !this.controller);
      }
    },
    noop() {
      console.log("noop");
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
      transform: translateY(-100px) !important;
    }
  }
}
</style>
