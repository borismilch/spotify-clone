<template>
  <div>
    <loader v-if="loading" />
    <div v-show="!loading">
      <div class="flex user-profile" :style="{ 'background-color': backColor }">
        <div class="overLay"></div>
        <div class="user-credentials flex cursor-pointer" style="z-index: 10">
          <div class="user-avatar" style="position: relative">
            <v-img
              width="100%"
              height="100%"
              :src="user.avatar"
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
            <span class="prof-text">Профіль</span>
            <h1 class="prof-title">{{ user.name }}</h1>
            <span class="spaan">Немає відкритих плейлістів</span>
          </div>
          <Dialog
            @changeStyle="changeStyle($event)"
            @onDialog="dialog = $event"
            :dialog="dialog"
          />
        </div>
      </div>
      <div
        class="lay2 z-10 absolute"
        :style="{ 'background-color': backColor }"
      ></div>
      <div class="lay3 z-10 absolute"></div>
      <div style="z-index-50">
        <span class="dots-w">...</span>
        <TrackList />
      </div>
      <div class="">
        <Recomends
          :title="'Відкриті плейлісти'"
          :template="cutoms"
          :isAuthors="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from "../components/ProfileModal.vue";
import Recomends from "../components/Recomends.vue";
import Loader from "../components/Loader.vue";
import { mapGetters } from "vuex";
import TrackList from "../components/TrackList.vue";
import doom from "../assets/doom.jpg";
export default {
  components: { TrackList, Recomends, Dialog, Loader },
  data: () => ({
    loading: true,
    dialog: false,
    backColor: "",
    doom,
    cutoms: [
      { src: "breeze", title: "Daily mix 2", artist: "By Builofy" },
      { src: "chuska", title: "Daily mix 1", artist: "By Builofy" },
      { src: "doom", title: "Daily mix 4", artist: "By Mick Gordon" },
      { src: "steampunk", title: "Daily mix 8", artist: "By Stepan" },
      { src: "sun", title: "Daily mix 9", artist: "By Builofy" },
      { src: "breeze", title: "Daily mix 2", artist: "By Builofy" },
    ],
  }),
  computed: {
    ...mapGetters(["user"]),
    trackShow() {
      return this.trackList.slice(0, 4);
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
.z-50 {
  z-index: 50 !important;
}
.lay2 {
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
  box-shadow: 5px 5px 40px #242424;
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
