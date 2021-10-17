<template>
  <div @click="dropdown = false">
    <button
      @click.once="createNewAlbum"
      :disabled="!tracks.length || holding"
      style="right: 8%; top: 10px; z-index: 1091 !important"
      class="modal-button r fixed z-50 px-20"
    >
      {{
        "liked" in (tracks.length ? tracks[0] : {}) ? "Обновить" : "Створити"
      }}
    </button>

    <Loader v-if="loading" />
    <div v-show="!loading">
      <div
        class="flex user-profile"
        :style="{
          'background-color':
            img === DefaultImg.img ? 'rgb(83, 83, 83)' : backColor,
        }"
      >
        <div class="lay"></div>
        <div class="user-credentials flex cursor-pointer" style="z-index: 10">
          <div class="user-avatar user-rofile" style="position: relative">
            <v-img
              width="100%"
              height="100%"
              :src="img"
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
            <span class="detail-text">Альбом</span>
            <h1 class="fav-title-big font-extrabold">{{ title }}</h1>
            <span class="detail-text" style="opacity: 0.7">{{
              description
            }}</span>
            <div class="flex items-center">
              <router-link to="/user" class="author-title hover-underline">
                {{ user.name }}</router-link
              >
            </div>
          </div>
          <ProfileModal
            :current="{ img, title, description }"
            :dialog="dialog"
            @changeStyle="changeStyle"
            @onDialog="dialog = $event"
            @changeAlbunTemplate="changeAlbunTemplate($event)"
            :defaultImg="DefaultImg.img"
          />
        </div>
      </div>

      <div class="relative">
        <div
          class="lay2 z-10 absolute"
          :style="{
            'background-color': 'rgb(83, 83, 83)',
          }"
        ></div>
        <div class="lay3 z-10 absolute"></div>
        <div class="flex gap-5">
          <span
            @click.stop="dropdown = true"
            class="dots-padding z-50 absolute"
            style="z-index: 20 !important"
            >...
          </span>
          <v-select
            style="
              width: 200px;
              top: 20px;
              position: absolute;
              left: 10%;
              z-index: 200 !important;
            "
            class="absolute"
            :items="genres"
            label="Вибрати жанр"
            dense
            solo
          ></v-select>
        </div>
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
            @removeItem="removeItem($event)"
            @changeItem="changeItem($event)"
            :tracks="currentTracks"
            :album="{ img, title, description, tracks }"
          >
            <div class="flex flex-col">
              <div
                class="flex z-10 items-end"
                style="padding: 20px 0px 86px 0px"
              ></div>
              <ListHeader style="position: relative !important" />
            </div>
          </TrackTable>
          <h1
            v-else
            class="hint-title z-10 absolute"
            :style="{
              padding: (currentTracks || []).length
                ? '0px 0px 24px 0px'
                : '85px 0px 24px 0px',
            }"
          >
            Добавте щось у свій новий альбом
          </h1>
          <section
            class="hint flex items-center justify-end"
            :style="{
              padding: (currentTracks || []).length
                ? '0px 0px 24px 0px'
                : '134px 0px 24px 0px',
            }"
          >
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
                <v-col class="flex" style="padding: 0px" cols="12">
                  <button
                    class="modal-button"
                    style="margin-right: auto; margin-left: unset; width: 150px"
                    @click="
                      dialog2 = true;
                      isChange = false;
                    "
                  >
                    Додати
                  </button>
                </v-col>
                <CreateModal2
                  :dialog="dialog2"
                  :current="isChange ? tracks[idx] : empty"
                  :defaultImg="DefaultImg.img"
                  @onDialog="dialog2 = $event"
                  @addSongToAlbum="addSongToAlbum($event)"
                />
              </v-col>
              <span
                @click="hint = false"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateModal2 from "../components/util/CreateModal2.vue";
import { normalize } from "../utils/normalize";
import ProfileModal from "../components/util/CreateModal.vue";
import CreateDropdown from "../components/util/CreateDropdown2.vue";
import analyze from "rgbaster";
import ListHeader from "../components/util/ListHeader.vue";
import TrackTable from "../components/PreviewTable.vue";
import Loader from "../components/Loader.vue";
import DefaultImg from "../utils/default";
import { mapGetters } from "vuex";
export default {
  metaInfo: { title: "Create | Collection" },
  data: () => ({
    genre: "for you",
    genres: [
      "For you",
      "Charts",
      "New songs",
      "Recomendations",
      "Concerts",
      "Pop music",
      "Rap",
      "Mood",
      "Anime",
      "Metal",
      "Afro",
      "Jazz",
      "Relax",
      "Gaming",
      "Rock",
    ],
    holding: false,
    isChange: false,
    idx: 0,
    empty: { img: "", title: "", description: "" },
    tracks: [],
    dialog: false,
    dropdown: false,
    dialog2: false,
    loading: true,
    img: DefaultImg.img,
    DefaultImg,
    hint: true,
    title: "",
    description: "",
    backColor: "rgb(83, 83, 83);",
  }),

  computed: {
    ...mapGetters(["albums", "user", "song", "controller", "playlists"]),
    currentTracks() {
      return this.tracks.map((t) => ({ ...t, album: this.title }));
    },
    current() {
      return this.albums.find((a) => a.id === this.$route.params.id);
    },
  },
  methods: {
    normalize,
    addSongToAlbum(e) {
      console.log(e);
      this.tracks.push(e);
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
    async createNewAlbum() {
      this.loading = true;
      this.isChange = true;
      const uid = await this.$store.dispatch("getUid");
      const alb = {
        src: this.img,
        title: this.title,
        tracks: this.currentTracks.map((t) => ({ ...t, audio: "" })),
        genre: this.genre,
        creator: uid,
        artist: this.user.name,
        creationDate: new Date().toLocaleDateString(),
        description: this.description,
        likes: 0,
      };
      const audios = this.currentTracks.map((c) => c.audio);
      await this.$store.dispatch("addAlbums", [
        alb,
        audios,
        this.$route.params.id,
      ]);
      this.$router.push("/detail/" + this.$route.params.id);
      this.$emit("pageMessage", "ALBUM_CREATED");
    },
    async changeAlbunTemplate(e) {
      this.title = e.title;
      this.description = e.description;
      this.img = e.img;
      await this.changeStyle();
    },
    fmtMSS(s) {
      return ((s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s).split(".")[0];
    },
    async remove() {
      this.loading = true;
      await this.$store.dispatch("deleteAlbum", this.$route.params.id);
      this.$emit("pageMessage", "ALBUM_DELETED");
      if (this.song.id === this.$route.params.id) {
        this.$store.commit("setSong", "");
      }
      this.$router.push("/collection/albums");
    },
    async sendToList() {
      this.$store.commit("setPlaylistSongs", this.currentTracks);
      this.$router.push("/playlist");
    },
    loadData() {
      this.title = this.current.title;
      this.img = this.current.src;
      this.description = this.current.description;
      this.genre = this.current.genre || "For You";
      this.creationDate =
        this.current.creationDate || new Date().toLocaleDateString();
      this.likes = this.current.likes;
      this.tracks = this.current.tracks || [];
      this.tracks.length ? (this.isChange = true) : (this.isChange = false);
    },
    async changeStyle() {
      const color = (await analyze(this.img))[0].color;
      this.backColor = color;
    },
    async removeItem(idx) {
      const t = this.currentTracks[idx];
      console.log(t);
      this.tracks.splice(idx, 1);
      if (t.ref === this.song.ref && t.title === this.song.title) {
        this.$store.commit("setSong", "");
      }
    },
    changeItem(idx) {
      this.isChange = true;
      this.idx = idx;
      this.dialog2 = true;
    },
  },
  async mounted() {
    this.loadData();
    await this.changeStyle();
    setTimeout(() => {
      this.loading = false;
    });
  },
  async beforeDestroy() {
    if (!this.isChange) {
      await this.$store.dispatch("deleteAlbum", this.$route.params.id);
    }
  },
  components: {
    Loader,
    TrackTable,
    ListHeader,
    CreateDropdown,
    ProfileModal,
    CreateModal2,
  },
};
</script>

<style lang="scss" scoped>
.modal-button {
  cursor: pointer !important;
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
  transform: unset !important;
  &:hover {
    background-color: #fff;
    color: #181818;
  }
  &:disabled {
    opacity: 0.4;
    &:hover {
      transform: unset !important;
    }
  }
}
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
