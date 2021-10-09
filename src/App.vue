<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      bottom
      :color="color"
      style="bottom: 20px; position: fixed"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn text color="#fff" v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <Loader v-if="loading" />
    <component
      v-else
      @pageMessage="setMessage($event)"
      :is="layOfOut"
    ></component>
  </v-app>
</template>

<script>
import Loader from "./components/Loader.vue";
import messages from "./utils/messages";
import MainLayout from "./layouts/Main.vue";
import EmptyLayout from "./layouts/Outdoor.vue";
export default {
  components: { MainLayout, EmptyLayout, Loader },
  computed: {
    layOfOut() {
      return this.$route.meta.auth ? "MainLayout" : "EmptyLayout";
    },
  },
  data: () => ({
    loading: true,
    messages,
    snackbar: false,
    text: "My timeout is set to 2000.",
    timeout: 5000,
    color: "",
  }),
  methods: {
    setMessage(e) {
      const res = this.messages[e] || {
        type: "error",
        message: "щось пішло не так",
      };
      this.text = res.message;
      this.color = res.type;
      this.snackbar = true;
    },
  },
  async mounted() {
    setTimeout(() => (this.loading = false), 200);
    await this.$store.dispatch("fetchAlbums");
  },
};
</script>

<style lang="scss">
.font-light {
  font-weight: 700 !important;
}
.v-application p {
  margin: 0px !important;
}
.v-application a {
  color: white !important;
}
.flex {
  flex: 0 0 auto !important;
}
.flex-1 {
  flex: 1 1 0 !important;
}
:root {
  --background-base: #121212;
  --background-highlight: #1a1a1a;
  --background-press: #000;
  --background-elevated-base: #242424;
  --background-elevated-highlight: #2a2a2a;
  --background-elevated-press: #000;
  --background-tinted-base: hsla(0, 0%, 100%, 0.07);
  --background-tinted-highlight: hsla(0, 0%, 100%, 0.1);
  --background-tinted-press: hsla(0, 0%, 100%, 0.04);
  --background-unsafe-for-small-text-base: #121212;
  --background-unsafe-for-small-text-highlight: #121212;
  --background-unsafe-for-small-text-press: #121212;
  --text-base: #fff;
  --text-subdued: #a7a7a7;
  --text-bright-accent: #1ed760;
  --text-negative: #f15e6c;
  --text-warning: #ffa42b;
  --text-positive: #1ed760;
  --text-announcement: #3d91f4;
  --essential-base: #fff;
  --essential-subdued: #727272;
  --essential-bright-accent: #1ed760;
  --essential-negative: #e91429;
  --essential-warning: #ffa42b;
  --essential-positive: #1ed760;
  --essential-announcement: #0d72ea;
  --decorative-base: #fff;
  --decorative-subdued: #292929;
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
    rgba(0, 0, 0, 0.50773812943146) 100%
  );
}
.disabled {
  &:disabled {
    opacity: 0.4;
  }
}
</style>
