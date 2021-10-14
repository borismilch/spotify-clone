<template>
  <div>
    <Loader v-if="loading" />
    <div v-show="!loading">
      <div class="flex user-profile" style="background-color: rgb(80, 56, 160)">
        <div class="lay"></div>
        <div class="user-credentials flex cursor-pointer" style="z-index: 10">
          <div class="user-avatar" style="position: relative">
            <v-img
              width="100%"
              height="100%"
              :src="LikesLogo"
              class="shadow-av rounded"
              alt=""
            />
          </div>
          <div
            class="user-info flex flex-col mx-6 justify-end mb-4"
            style="margin-top: 20px"
          >
            <span class="detail-text">Плейліст</span>
            <h1 class="fav-title-big font-extrabold">Улюблені треки</h1>
            <div class="flex items-center">
              <v-img
                :src="user.avatar"
                class="rounded-circle mr-2"
                style="
                  width: 28px;
                  height: 28px;
                  object-fit: cover;
                  flex: 0 0 auto !important;
                "
              />
              <span class="author-title">{{ user.name }}</span>
              <li class="text-tracks ml-2">
                <span style="position: relative; left: -10px"
                  >{{ trueLikedTracks.length }} {{ tracksCountLabel }}</span
                >
              </li>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          class="lay2 z-10 absolute"
          style="background-color: rgb(80, 56, 160)"
        ></div>
        <div class="lay3 z-10 absolute"></div>

        <div class="z-10" style="padding: 0px 32px 0px 32px; positi">
          <TrackTable
            v-if="likedTracks.length"
            @pageMessage="$emit('pageMessage', $event)"
            :timed="true"
            :tracks="trueLikedTracks"
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
                              trueLikedTracks.find(
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
              <ListHeader :timed="true" />
            </div>
          </TrackTable>
          <p
            style="
              z-index: 20 !important;
              font-size: 20px;
              font-weight: bold;
              margin: 30px 0px 0px 0px !important;
            "
            v-else
            class="text-lg absolute"
          >
            Вподобайки відсутні,
            <router-link
              to="/"
              style="color: #1ed760 !important"
              class="under"
              tag="a"
              >Перейти на головну</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListHeader from "../components/util/ListHeader.vue";
import TrackTable from "../components/TrackList.vue";
import Loader from "../components/Loader.vue";
import LikesLogo from "../assets/likes.png";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["albums", "user", "likes", "song", "controller"]),

    likedTracks() {
      return this.likes.map((l) => {
        return this.albums
          .filter((a) => a.id === l.id)
          .map((a) => {
            return a.tracks
              .filter((t) => t.parent === l.id && t.ref === l.ref)
              .map((t) => ({
                ...t,
                desc: a.title,
                albumImg: a.src,
              }));
          });
      });
    },
    trueLikedTracks() {
      return this.likedTracks.length
        ? this.likedTracks.map((t) => t[0][0])
        : [];
    },
    tracksCountLabel() {
      return this.len === 1 ? "трек" : this.len <= 2 ? "трека" : "треків";
    },
  },
  components: { Loader, TrackTable, ListHeader },
  data: () => ({
    loading: true,
    LikesLogo,
  }),
  methods: {
    fmtMSS(s) {
      return ((s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s).split(".")[0];
    },
    async setActiveAlbum() {
      const isAc = this.song
        ? !!this.trueLikedTracks.find(
            (t) => t.ref === this.song.ref && t.parent === this.song.id
          )
        : false;
      console.log(isAc);
      if (!isAc) {
        await this.$store.dispatch("getFirstSong", [
          this.trueLikedTracks[0].parent,
          0,
        ]);
      }
      if (isAc) {
        this.$store.commit("changeController", !this.controller);
      }
    },
  },
  mounted() {
    this.$emit("changeStyle", "rgb(80, 56, 160)");
    this.$emit("changeContent", "Любимі пісні");
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.under {
  &:hover {
    text-decoration: underline !important;
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

// {{
//                 (song ? song.id === $route.params.id && song.play : false)
//                 ? "mdi-pause"
//                 : "mdi-play"
//               }}
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
  font-size: 48px;
  line-height: 48px;
}

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
    rgba(0, 0, 0, 0.573739837731968) 2%,
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
