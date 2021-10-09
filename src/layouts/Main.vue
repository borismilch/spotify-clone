<template>
  <div class="bg-sp-dark bg-gradient-to-b h-screen pb-20">
    <div class="flex" style="height: 88vh">
      <HeadNav @emitImage="emitImage($event)" :imageShown="imageShown" />

      <div class="p-layout reletive w-full h-full">
        <NavigationTop :bgCol="navColor" :navContent="navContent" />
        <div class="pb-32">
          <router-view
            @changeContent="navContent = $event"
            @changeStyle="navColor = $event"
            @pageMessage="pageResponse($event)"
          />
        </div>
      </div>
    </div>

    <FooterPlayer
      @pageMessage="pageResponse($event)"
      @emitImage="emitImage($event)"
      :imageShown="!imageShown"
    />
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav.vue";
import NavigationTop from "../components/NavigationTop.vue";
import FooterPlayer from "../components/FooterPlayer.vue";
export default {
  data: () => ({
    imageShown: false,
    navColor: "#121212",
    navContent: "",
  }),
  components: {
    HeadNav,
    NavigationTop,
    FooterPlayer,
  },
  methods: {
    emitImage(e) {
      console.log(e);
      this.imageShown = e;
    },
    pageResponse(e) {
      this.$emit("pageMessage", e);
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #121212 !important;
}
.p-layout {
  padding: 0px 0px 108px 256px !important;
}
</style>
