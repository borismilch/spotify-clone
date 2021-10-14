<template>
  <div
    class="w-64 z-50 fixed overflow-hidden bg-black h-full flex flex-col flex-grow-0"
  >
    <router-link to="/" tag="div">
      <img
        :src="logo"
        style="
          filter: brightness(0) invert(1);
          height: 95px;
          max-width: 171px;
          width: 100%;
        "
        alt=""
      />
    </router-link>
    <div class="flex-col">
      <div>
        <div class="mx-3">
          <router-link
            class="
              w-full
              duration-150
              text-sm
              font-semiboldS
              rounded
              px-4
              py-2
              flex
              items-center
              justify-start
              gap-3
              text-sp-ligntest
              font-light
            "
            v-for="link in links"
            :key="link.id"
            :to="link.to"
            exact
            active-class="link-active"
          >
            <v-icon color="#B3B3B3" class="text-lg">mdi-{{ link.icon }}</v-icon>
            <p class="ml-1 dots">{{ link.name }}</p>
          </router-link>
        </div>
        <div class="mx-5 my-2">
          <h1
            class="
              text-xs
              mb-1
              font-bold
              text-sp-ligntest
              tracking-widest
              uppercase
            "
          >
            Playlists
          </h1>
          <button
            @click="createPlaylist"
            exact
            active-class="active2"
            class="flex pr-3 py-2 hover-effect items-center justify-start w-40"
          >
            <div
              class="
                h-7
                w-7
                duration-300
                hover:bg-white
                bg-sp-ligntest
                rounded-sm
                flex
                items-center
                justify-center
              "
              alt=""
            >
              <v-icon color="#000" class="text-sp-light text-xs"
                >mdi-plus</v-icon
              >
            </div>
            <span class="text-white ml-2 w-24 flex-1 dots"
              >Створити плейліст</span
            >
          </button>

          <router-link
            to="/likes"
            exact
            active-class="active2"
            class="flex pr-3 py-2 items-center justify-start w-40 block"
          >
            <div
              class="
                h-7
                w-7
                hover-effect
                special-gradient
                rounded-sm
                flex
                items-center
                justify-center
              "
              alt=""
            >
              <v-icon class="text-white text-xs" color="#fff">mdi-heart</v-icon>
            </div>
            <span class="text-sp-ligntest ml-2 dots">Любимі пісні</span>
          </router-link>
          <div class="w-full h-px bg-sp-ligntest bg-opacity-50 my-3"></div>
        </div>
        <div class="mx-5">
          <div
            class="w-full h-10 overflow-y-scroll duration-200 flex flex-col"
            :class="{ 'h-75': !imageShown }"
          >
            <router-link
              :to="'/create/' + p.id"
              exact
              active-class="text-sp-green"
              v-for="p in playlistsTitles"
              :key="p.id"
              style="font-size: 14px; color: #b3b3b3"
              class="
                cursor-pointer
                text-sp-ligntest
                font-semibold
                hover:text-white
                py-1
              "
            >
              {{ p.title }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="relative">
        <button
          class="
            flex
            dots
            w-full
            hover-effect
            flex-1
            mx-auto
            px-4
            mt-3
            rounded-sm
            items-center
            justify-start
            duration-200
            text-sp-ligntest
            hover:text-white
          "
          style="padding-bottom: 5px"
        >
          <v-icon color="#fff">mdi-arrow-down-circle</v-icon>
          <p class="text-base w-full" @click="emitImage(false)">Download app</p>
        </button>
      </div>
      <div
        class="
          relative
          self-end
          header-previev
          overflow-hidden
          duration-600
          -translate-y-0
        "
        @click="emitImage(false)"
      >
        <img
          :src="song ? song.albumImg : doom"
          class="flex-1 w-full"
          style="object-fit: cover; height: 230px"
          alt=""
        />
        <div
          class="
            absolute
            top-1
            cursor-pointer
            opacity-0
            duration-200
            right-1
            text-2xl text-sp-darkest
            justify-center
            items-center
          "
        >
          <div
            class="
              bg-sp-dark
              opacity-0
              hover:opacity-100
              duration-150
              rounded-full
              p-1
              text-base
              flex
              items-center
              justify-center
            "
          >
            <v-icon class="text-white" color="#fff">mdi-chevron-down</v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "../assets/Logo.svg";
import doom from "../assets/music.jpg";
export default {
  props: {
    imageShown: Boolean,
  },
  data: () => ({
    logo,
    doom,
    setId: "Home",
    links: [
      { id: "0ijikjkjkkmiii--", name: "Головна", icon: "home", to: "/" },
      {
        id: "1hhmnjmiol,mkmnm",
        name: "Знайти",
        icon: "text-search",
        to: "/search",
      },
      {
        id: "2jy8hgujbjhkhikk",
        name: "Моя бібліотека",
        icon: "bookshelf",
        to: "/lib",
      },
    ],
  }),
  methods: {
    emitImage(e) {
      this.$emit("emitImage", e);
    },
    async createPlaylist() {
      this.$emit("pageMessage", "PLAYLIST_CREATED");
      await this.$store.dispatch("addPlaylist");

      this.$router.push(
        "/create/" + this.playlists[this.playlists.length - 1].id
      );
    },
  },
  computed: {
    ...mapGetters(["song", "playlists"]),
    playlistsTitles() {
      return this.playlists.map((p) => ({ id: p.id, title: p.title }));
    },
  },
};
</script>

<style lang="scss">
.text-sp-green {
  color: #1ed760 !important;
}
.special-gradient {
  background: linear-gradient(135deg, #450af5, #c4efd9) !important;
}

::-webkit-scrollbar {
  width: 13px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
}
.-header {
  width: 213px;
}
.header-previev {
  &:hover {
    & div {
      opacity: 1 !important;
    }
  }
}
.ghg {
  transform: translateY(80%);
}
.h-75 {
  height: 19.5rem !important;
}
.active2 {
  color: white !important;
  opacity: 1 !important;
}
</style>
