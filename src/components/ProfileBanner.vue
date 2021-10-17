<template>
  <router-link
    to="/likes"
    tag="div"
    class="albs-banner cursor-pointer"
    :style="{
      background: `linear-gradient(149.46deg, ${backColor}, #aaaad1 199.16%)`,
    }"
  >
    <div class="flex flex-col lpf">
      <div class="flex-1 flex cursor-pointer" style="align-items: end">
        <div
          style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
        ></div>
      </div>
      <div class="flex">
        <div class="user-ava rounded-circle mr-6" style="position: relative">
          <v-img
            width="100%"
            height="100%"
            :src="user.avatar"
            class="shadow-av rounded-circle"
            alt=""
          />
        </div>
        <div class="flex flex-col justify-center">
          <h1>{{ user.name }}</h1>
          <router-link to="/user" class="hover:underline"
            >Перейти в профіль</router-link
          >
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import analyze from "rgbaster";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    backColor: "",
  }),
  methods: { analyze },
  computed: {
    ...mapGetters(["song", "albums", "controller", "user"]),
    findNeededIdx() {
      return this.albums
        .find((a) => a.id === this.likes[0].id)
        .tracks.findIndex((t) => t.ref === this.likes[0].ref);
    },
  },
  async mounted() {
    const color = (await analyze(this.user.avatar))[0].color;
    console.log(color);
    this.backColor = color;
  },
};
</script>

<style lang="scss">
.user-ava {
  z-index: 10;
  width: 112px;
  height: 112px;
}
.albs-banner {
  color: #fff;
  font-size: 16px;
  grid-column: span 2;
  height: inherit;
  line-height: 24px;
  border-radius: 4px;
  flex: 1;
  isolation: isolate;
  padding: 20px;
  position: relative;
  transition: background-color 0.3s ease;
  width: 100%;
  & button {
    font-size: 30px !important;
  }
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    content: "";
  }
  &:hover {
    & button {
      transform: translateY(-25px);
      opacity: 1 !important;
    }
  }
}
</style>
