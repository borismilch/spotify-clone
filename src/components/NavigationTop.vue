<template>
  <div
    id="navBar"
    ref="navBar"
    style="z-index: 1000"
    class="
      duration-200
      fixed
      w-full
      top-0
      py-3
      px-6
      flex
      items-center
      justify-between
    "
    :style="{
      height: '56px',
      background: scroll < 60 ? 'transparent' : bgCol,
      'max-width': '1280px',
    }"
  >
    <div
      class="lay duration-200"
      :style="{ opacity: scroll > 60 ? 0.4 : 0 }"
    ></div>
    <div class="flex gap-6 items-center" style="z-index: 10">
      <div class="flex gap-4">
        <button
          @click="$router.go(-1)"
          class="
            rounded-full
            opacity-90
            text-white text-xl
            bg-black
            w-8
            h-8
            flex
            items-center
            justify-center
          "
        >
          <v-icon>mdi-chevron-left</v-icon>
        </button>

        <button
          @click="$router.go(+1)"
          class="
            rounded-full
            opacity-90
            text-white text-xl
            bg-black
            w-8
            h-8
            flex
            items-center
            justify-center
          "
        >
          <v-icon>mdi-chevron-right</v-icon>
        </button>
      </div>
      <Fade>
        <div class="flex">
          <v-col
            v-if="$route.meta.searchField"
            style="padding: 0px"
            class="flex mt-7 flex-col items-center justify-center"
            cols="12"
          >
            <v-text-field
              filled
              @input="$emit('searching', $event)"
              rounded
              dense
              clearable
              prepend-inner-icon="mdi-magnify"
              placeholder="Пошук треків"
            ></v-text-field>
          </v-col>
          <ul class="flex" v-else-if="this.$route.meta.collection">
            <li>
              <router-link
                exact
                active-class="active"
                class="collection-link"
                to="/collection/playlists"
              >
                <span> Плейлісти </span>
              </router-link>
            </li>

            <li v-if="myAlbums.length">
              <router-link
                exact
                active-class="active"
                class="collection-link"
                to="/collection/albums"
              >
                <span> Альбоми </span>
              </router-link>
            </li>

            <li>
              <button class="collection-link" @click="createEmptyAlbum">
                <span> Додати альбом </span>
              </button>
            </li>
          </ul>
          <div
            v-else-if="scroll > 60 && this.$route.meta.player"
            class="flex gap-3 items-center"
          >
            <div
              @click="setActiveAlbum"
              style="width: 40px; height: 40px"
              class="
                rounded-full
                shadow
                flex
                text-bold
                items-center
                justify-center
                duration-300
                bg-green-600
                text-white
                p-2
                player
                hov-scale
              "
            >
              <v-icon class="text-xl">{{
                (song ? song.id === $route.params.id && song.play : false)
                  ? "mdi-pause"
                  : "mdi-play"
              }}</v-icon>
            </div>
            <span class="spa">{{ navContent }}</span>
          </div>
        </div>
      </Fade>
    </div>
    <UserDropdown />
  </div>
</template>

<script>
import delaultImg from "../utils/default";
import { mapGetters } from "vuex";
import Fade from "../components/util/transition.vue";
import UserDropdown from "./UserDropdown.vue";
export default {
  props: {
    bgCol: String,
    navContent: String,
  },
  data: () => ({
    scroll: 0,
    emptyAlbImg: delaultImg.img,
  }),
  components: { UserDropdown, Fade },
  computed: {
    ...mapGetters(["song", "albums", "controller", "user"]),
    isScrolled() {
      return this.$refs.navBar.parent;
    },
    myAlbums() {
      return this.albums.filter((a) => a.creator === this.user.id);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      this.scroll = window.top.scrollY;
    },
    async setActiveAlbum() {
      const activeAlb = this.albums.find((a) => a.id === this.$route.params.id);
      const isAc = !!activeAlb.tracks.find((t) => t.ref === this.song.ref);
      console.log(isAc);
      if (this.song ? this.song.id !== this.$route.params.id : true) {
        await this.$store.dispatch("getFirstSong", [activeAlb.id, 0]);
      }
      if (this.song ? this.song.id === this.$route.params.id && isAc : false) {
        this.$store.commit("changeController", !this.controller);
      }
    },
    async createEmptyAlbum() {
      const id = await this.$store.dispatch("createEmptyAlbum", {
        src: this.emptyAlbImg,
        title: "New Album",
        description: "",
        tracks: [],
        artist: "",
        creationDate: "",
        genre: "",
        likes: 0,
      });
      this.$router.push("/collection/create/" + id);
    },
  },
};
</script>

<style lang="scss">
.shadow {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}
.hov-scale {
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
}
.modal-button {
  cursor: pointer;
  margin-left: auto;
  width: 130px;
  padding: 6px 0px;
  background-color: #181818;
  color: #fff;
  border: 2px solid transparent;
  border-radius: 500px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.76px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  -webkit-transition: all 33ms cubic-bezier(0.3, 0, 0, 1);
  transition: all 33ms cubic-bezier(0.3, 0, 0, 1);
  white-space: nowrap;
  transition: 0.1s;
  &:hover {
    background-color: #fff;
    color: #181818;
  }
  &:disabled {
    opacity: 0.4;
  }
}
.spa {
  padding: 0.08em 0px;
  visibility: visible;
  width: 100%;
  font-size: 32px;
  line-height: 48px;
  font-weight: 600;
  opacity: 0.8;
}
.collection-link {
  border-radius: 4px;
  color: #b2b2b2;
  display: inline-block;
  margin: 0 8px;
  padding: 8px 16px;
  position: relative;
  text-decoration: none;
  &.active {
    background-color: #333 !important;
    color: white;
  }
  & span {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: normal;
    line-height: 16px;
    text-transform: none;
  }
}
</style>
