<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <div class="flex user-profile" style="background-color: #181818">
        <div class="lay"></div>
        <div class="user-credentials flex cursor-pointer" style="z-index: 10">
          <div
            class="user-info flex flex-col mx-6 justify-end mb-4"
            style="margin-top: 20px"
          >
            <h1 class="fav-title-big">
              {{
                $route.params.genre[0].toUpperCase() +
                $route.params.genre.slice(1)
              }}
            </h1>
            <div class="flex items-center"></div>
          </div>
        </div>
      </div>
      <div class="lay2 z-10 absolute" style="background-color: #181818"></div>
      <div class="lay3 z-10 absolute"></div>
      <div class="z-10" style="padding: 0px 32px 0px 32px; left: 0">
        <div>
          <div class="flex flex-col gap-5" v-if="findedAlbs.length">
            <div class="flex flex-col mt-6">
              <h1 class="detail-title z-50 font-bold">Плейлісти</h1>
              <Recomends
                :template="findedAlbs"
                :style="{ width: 200 * findedAlbs.length + 'px' }"
              />
            </div>
            <div class="flex flex-col mt-6">
              <h1 class="detail-title font-bold">Новинки</h1>
              <Recomends
                :style="{ width: 200 * findedAlbs.length + 'px' }"
                :template="newestAlbs"
              />
            </div>
          </div>

          <p
            v-else
            style="
              left: 300px;
              right: 0;
              z-index: 20 !important;
              font-size: 20px;
              font-weight: bold;
              margin: 30px 0px 0px 0px !important;
            "
            class="text-lg absolute"
          >
            В даній категорії нічого немає,
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
import Loader from "../components/Loader.vue";
import { mapGetters } from "vuex";
import Recomends from "../components/Recomends.vue";
export default {
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters(["albums"]),
    findedAlbs() {
      return this.albums.filter((a) => a.genre === this.$route.params.genre);
    },
    newestAlbs() {
      return [...this.findedAlbs].sort(
        (a, b) => new Date(a.creationDate) < new Date(b.creationDate)
      );
    },
  },
  components: {
    Recomends,
    Loader,
  },
  mounted() {
    this.$emit("changeStyle", "#181818");
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
  font-size: 24px;
  line-height: 24px;
}

.z-50 {
  z-index: 50 !important;
}
.lay2 {
  height: 132px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 0 !important;
  border-bottom: 2px solid #727272;
}
.lay3 {
  z-index: 0 !important;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.573739837731968) 2%,
    rgba(18, 18, 18, 1) 100%
  );
  height: 132px;
  position: absolute;
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

.user-profile {
  position: relative;
  align-items: flex-end;
  height: 270px;
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
