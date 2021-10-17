<template>
  <div>
    <loader v-if="loading" />
    <div v-show="!loading">
      <div class="flex user-profile" :style="{ 'background-color': backColor }">
        <div class="overLay"></div>
        <div class="user-credentials flex cursor-pointer" style="z-index: 10">
          <div class="user-avatar rounded-circle" style="position: relative">
            <v-img
              width="100%"
              height="100%"
              :src="currentUser.avatar"
              class="rounded-circle shadow-av"
              alt=""
            />
            <v-overlay
              class="profile-overlay"
              :absolute="true"
              :value="true"
              style="border-radius: 50%"
            >
              <v-icon style="font-size: 60px">mdi-lead-pencil</v-icon>
            </v-overlay>
          </div>
          <div
            @click="dialog = true"
            class="user-info flex flex-col mx-6 justify-center"
          >
            <span v-if="currentUser.id === user.id" class="prof-text"
              >Профіль</span
            >
            <h1 class="prof-title">{{ currentUser.name }}</h1>
            <span class="spaan"
              >Альбомів створено: {{ usersAlbums.length }}</span
            >
          </div>
          <Dialog
            v-if="currentUser.id === user.id"
            @changeStyle="changeStyle($event)"
            @onDialog="dialog = $event"
            :dialog="dialog"
          />
        </div>
      </div>
      <div
        class="lay2 absolute"
        :style="{ 'background-color': backColor }"
      ></div>
      <div class="lay3 absolute"></div>
      <section>
        <div class="z-index-50 mb-3">
          <v-icon class="dots-w">mdi-dots-horizontal</v-icon>
          <AlbumsList v-if="usersAlbums.length" :albums="usersAlbums">
            <div class="z-50">
              <h1 class="list-title mb-3">Авторські альбоми:</h1>
              <ListHeader :noAlbs="true" />
            </div>
          </AlbumsList>
        </div>
        <div>
          <Recomends
            :title="'Відкриті плейлісти'"
            :template="usersAlbums"
            :isAuthors="false"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Dialog from "../components/ProfileModal.vue";
import Recomends from "../components/Recomends.vue";
import ListHeader from "../components/util/ListHeader.vue";
import Loader from "../components/Loader.vue";
import { mapGetters } from "vuex";
import AlbumsList from "../components/util/AlbumList.vue";
import doom from "../assets/doom.jpg";
export default {
  metaInfo: { title: `Profile | Builofy ` },
  components: { AlbumsList, Recomends, Dialog, Loader, ListHeader },
  data: () => ({
    loading: true,
    dialog: false,
    backColor: "",
    doom,
  }),
  computed: {
    ...mapGetters(["user", "users", "albums"]),
    trackShow() {
      return this.trackList.slice(0, 4);
    },
    currentUser() {
      return this.users.find((u) => u.id === this.$route.params.id);
    },
    usersAlbums() {
      return this.albums.filter((a) => a.creator === this.$route.params.id);
    },
  },
  methods: {
    changeStyle(e) {
      this.backColor = e;
      this.$emit("changeStyle", e);
    },
  },
  mounted() {
    setTimeout(() => (this.loading = false), 100);
  },
};
</script>
<style lang="scss" scoped>
section {
  padding: 0px 32px 0px 32px;
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
  box-shadow: 5px 5px 10px #111111;
}
.user-profile {
  position: relative;
  align-items: flex-end;
  height: 340px;
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
  transform: translate(-30px, 10px);
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
.overLay {
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
    rgba(0, 0, 0, 0.62773812943146) 100%
  );
}
</style>
