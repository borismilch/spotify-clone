<template>
  <div @click="dropdown = false">
    <Loader v-if="loading" />
    <div v-show="!loading">
      <div
        class="flex user-profile"
        :style="{
          'background-color':
            current.img === DefaultImg.img ? 'rgb(83, 83, 83)' : backColor,
        }"
      >
        <div class="lay"></div>
        <div class="user-credentials flex cursor-pointer" style="z-index: 10">
          <div class="user-avatar user-rofile" style="position: relative">
            <v-img
              width="100%"
              height="100%"
              :src="current.img"
              class="shadow-av rounded"
              alt=""
            />
            <v-overlay
              @click="dialog = true"
              class="profile-overlay z-50"
              :absolute="true"
              :value="true"
            >
              <v-icon style="font-size: 60px">mdi-lead-pencil</v-icon>
            </v-overlay>
          </div>
          <div
            @click="dialog = true"
            class="user-info z-50 flex flex-col mx-6 justify-end mb-4"
          >
            <span class="detail-text">Плейліст</span>
            <h1 class="fav-title-big font-extrabold">{{ current.title }}</h1>
            <span class="detail-text" style="opacity: 0.7">{{
              current.description
            }}</span>
            <div class="flex items-center">
              <router-link to="/user" class="author-title hover-underline">
                {{ user.name }}</router-link
              >
            </div>
          </div>
          <ProfileModal
            :current="current"
            :dialog="dialog"
            @changeStyle="changeStyle"
            @onDialog="dialog = $event"
            :defaultImg="img"
          />
        </div>
      </div>

      <div class="relative">
        <div
          class="lay2 z-10 absolute"
          :style="{
            'background-color':
              current.img === DefaultImg.img ? 'rgb(83, 83, 83)' : backColor,
          }"
        ></div>
        <div class="lay3 z-10 absolute"></div>
        <span @click.stop="dropdown = true" :style="{transform: !(currentTracks || []).length ? 'translate(0px)' : 'translate(80px, 20px)'}"  class="dots-padding z-20 absolute" style="z-index: 20 !important"
          >...</span
        >
        <CreateDropdown
          @remove="remove"
          @sendToList="sendToList"
          :dropdown="dropdown"
         
          @dropdown="dropdown = false"
        />
        <div class="z-10" style="padding: 0px 32px 0px 32px">
          <TrackTable
           v-if="currentTracks.length"
            @pageMessage="$emit('pageMessage', $event)"
            :tracks="currentTracks"
          >
            <div class="flex flex-col">
              <div
                class="flex z-10 items-end"
                style="padding: 20px 0px 86px 0px"
              >
                <div
                  class="button-circle-play"
                  style="margin: 6px 6px 0px 0px; position: absolute"
                >
                  <v-icon style="font-size: 40px" @click="setActiveAlbum">
                    {{
                      (
                        song
                          ? !!(
                              currentTracks.find(
                                (t) =>
                                  t.parent === song.id && t.ref === song.ref
                              ) && song.play
                            )
                          : false
                      )
                        ? "mdi-pause"
                        : "mdi-play"
                    }}
                  </v-icon>
                </div>
              </div>
              <ListHeader />
            </div>
          </TrackTable>

          <section class="hint flex items-center justify-end" :style="{padding: 
          (currentTracks || []).length ? '0px 0px 24px 0px' : '114px 0px 24px 0px'}">
            <div class="w-full flex items-center" v-if="hint">
              <v-col
                class="flex flex-col"
                style="
                  padding: 24px 0px 0px 0px;
                  border-top: 1px solid rgba(255, 255, 255, 0.1);
                  z-index: 20;
                "
                cols="12"
              >
                <h1 class="hint-title z-10">
                  Добавте що-небуть у свій плейліст тв категорії
                </h1>
                <v-col style="padding: 0px" class="flex flex-col" cols="5">
                  <v-text-field
                    v-model="searchQuery"
                    filled
                    rounded
                    dense
                    clearable
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Пошук треків"
                  ></v-text-field>
                </v-col>
              </v-col>
              <span
                @click="hint = false; searchQuery = ''"
                style="font-size: 40px; transform: translateX(-30px)"
                class="cursor-pointer text-hover z-50"
              >
                &times;</span
              >
            </div>
            <p
              @click="hint = true"
              v-else
              class="
                flex
                mt-5
                mr-5
                hover-underline
                cursor-pointer
                items-stert
                justify-end
                z-50
              "
            >
              Еще
            </p>
          </section>

          <TrackTable
            v-if="normalQuery"
            :timed="false"
            :buttons="true"
            @addTrack="addTrack($event)"
            @pageMessage="$emit('pageMessage', $event)"
            :tracks="searchingTracks"
          >
           
            <div class="flex flex-col">
              <ListHeader :buttons="true" />
              <span class="ml-2" v-if="!searchingTracks.length">По вашому запросу нічого не знайдено</span>
            </div>
            
          </TrackTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { normalize } from "../utils/normalize";
import ProfileModal from "../components/util/ProfileModal2.vue";
import CreateDropdown from "../components/util/CreateDropdown.vue";
import analyze from "rgbaster";
import ListHeader from "../components/util/ListHeader.vue";
import TrackTable from "../components/TrackList.vue";
import Loader from "../components/Loader.vue";
import DefaultImg from "../utils/default";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["albums", "user", "song", "controller", "playlists"]),
    current() {
      return this.playlists.find((p) => p.id === this.$route.params.id);
    },
    currentIdx() {
      return this.playlists.findIndex((p) => p.id === this.$route.params.id) +
        1 >
        this.playlists.length - 1
        ? this.playlists.findIndex((p) => p.id === this.$route.params.id) - 1
        : this.playlists.findIndex((p) => p.id === this.$route.params.id) + 1;
    },
    currentTracks () {
      return Object.keys(this.current.tracks || []).map(key => {
        const t = this.current.tracks
        const alb = this.albums.find(a => a.id === t[key].parent)
        const track = this.allTracks.find(track => 
        t[key].parent === track.parent 
        &&
        t[key].ref === track.ref
        &&
        t[key].album === track.album
       )
        return {...track, selfId: key, albumImg: alb.src, desc: alb.title}
      })
    },  
    searchingTracks() {
      return (
        this.allTracks
          .filter((t) => {
           return  (this.normalize(t.title).includes(this.normalQuery) || this.normalize(t.album).includes(this.normalQuery) || this.normalize(t.author).includes(this.normalQuery)) && !this.currentTracks.find(ct=> ct.parent === t.parent && ct.ref === t.ref)
          })
          .map(t => {
            const alb = this.albums.find(a => a.id === t.parent)
            return { ...t, albumImg: alb.src, desc: alb.title }
          })
      );      
    },
    allTracks () {
      return this.albums
      .map((a) => a.tracks)
      .flat(1)
    },
    normalQuery() {
      return this.normalize(this.searchQuery);
    },
  },
  components: { Loader, TrackTable, ListHeader, CreateDropdown, ProfileModal },
  data: () => ({
    dialog: false,
    dropdown: false,
    loading: true,
    img: "",
    DefaultImg,
    searchQuery: "",
    hint: true,
    backColor: "rgb(83, 83, 83);",
  }),
  methods: {
    normalize,
    async addTrack (params) {
      const [ref, parent, album, duration] = params
      await this.$store.dispatch('addTrackToPlaylist', {id: this.current.id, album, ref, parent, duration })
      this.$emit('pageMessage', 'ADDED_TO_PLAYLIST')

    },
   async setActiveAlbum() {
      const isAc = this.song
        ? !!this.currentTracks.find(
            (t) => t.ref === this.song.ref && t.parent === this.song.id
          )
        : false;
      console.log(isAc);
      if (!isAc) {
        await this.$store.dispatch("getFirstSong", [
          this.currentTracks[0].parent,
          0,
        ]);
      }
      if (isAc) {
        this.$store.commit("changeController", !this.controller);
      }
    },
    log() {
      console.log("works");
    },
    fmtMSS(s) {
      return ((s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s).split(".")[0];
    },
    async remove() {
      console.log(this.playlists[this.currentIdx].id);
      await this.$store.dispatch("removePlaylist", this.current.id);
      this.$emit("pageMessage", "PLAYLIST_DELETED");
      this.$router.push("/create/" + this.playlists[this.currentIdx].id);
    },
    async sendToList() {
      // await this.$store.dispatch("getFirstSong", [this.currentTracks[0].parent, 0, this.current.id, true])
      this.$store.commit('setPlaylistSongs', this.currentTracks) 
     this.$router.push('/playlist')
     
    },
    changeStylus(e) {
      this.backColor = e;
      console.log(this.backColor);
      this.$emit("changeStyle", e);
    },

    async changeStyle() {
      this.img = this.current.img;
      const color = (await analyze(this.img))[0].color;
      this.backColor = color;
      this.$emit("changeStyle", this.backColor);
      this.$emit("changeContent", this.current.title);
    },
  },
  async mounted() {
    await this.changeStyle();
    setTimeout(() => { this.loading = false })
  },
};
</script>

<style lang="scss">
.profile-overlay {
  opacity: 0;
  transition: all 0.2s ease;
}
.user-avatar {
  &:hover {
    .profile-overlay {
      opacity: 1;
    }
  }
}
.hint {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  
}
.hint-title {
  color: rgb(255, 255, 255);
  margin-bottom: 16px;

  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 28px;
  text-transform: none;
}
</style>

<style lang="scss" scoped>
.dots-padding {
  letter-spacing: 3px;
  cursor: pointer;
  transition: 0.1s all ease;
  padding: 12px 32px 24px 32px;
  color: #b3b3b3;
  font-size: 29px;
  font-weight: bold;
  &:hover {
    color: #fff;
  }
}
.hover-underline {
  &:hover {
    text-decoration: underline !important;
  }
}
.under {
  &:hover {
    text-decoration: underline !important;
  }
}
.text-hover {
  color: #b3b3b3;
  transition: 0.2s all ease;
  &:hover {
    color: #fff;
  }
}
.button-circle-play {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;

  background-color: #1db954 !important;
  color: #fff;

  border-radius: 50%;
  font-size: 28px;
}
.lay {
  background: linear-gradient(
    180deg,
    rgba(233, 20, 41, 0) 2%,
    rgba(0, 0, 0, 0.543812943146) 100%
  ) !important;
}
.m-0 {
  margin: 0;
}
.text-tracks {
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;

  font-size: 14px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 16px;
  text-transform: none;
}
.author-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: normal;
  line-height: 16px;
  text-transform: none;

  color: #fff;
  text-decoration: none;
}
.fav-title-big {
  padding: 0.08em 0px;
  visibility: visible;
  width: 100%;

  font-size: 96px;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 96px;
  text-transform: none;
}
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
  z-index: 10;
  font-size: 48px;
  line-height: 48px;
}

.z-50 {
  z-index: 50 !important;
}
.lay2 {
  z-index: 0 !important;
  height: 232px;
  position: absolute;
  width: 100%;
  border-bottom: 2px solid #727272;
}
.lay3 {
  z-index: 0 !important;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.653739837731968) 2%,
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
  box-shadow: 5px 6px 12px #111111;
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
  display: flex;
  padding: 0 !important;
  align-items: center;
  justify-content: center;

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
