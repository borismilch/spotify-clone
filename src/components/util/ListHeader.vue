<template>
  <div
    class="w-full z-10 mb-3 py-2"
    style="
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: #b3b3b3;
      margin: 0px 6px 0px 6px;
    "
  >
    <div class="flex justify-beetween px-6 mt-1 flex-1 items-center">
      <div class="flex flex-1 items-center gap-3">
        <span class="list-title" style="font-size: 20px">#</span>
        <span class="normal-font flex-1">Назва</span>
      </div>
      <span
        v-if="!noAlbs"
        style="color: #b3b3b3; flex: 0.3 0 auto"
        class="ml-2"
      >
        Альбом</span
      >
      <span
        v-if="timed"
        style="color: #b3b3b3; flex: 0.3 0 auto !important"
        class="flex"
        >Добавлено</span
      >
      <span class="more flex justify-end" style="width: 141px">
        <v-icon style="font-size: 18px; color: #b3b3b3"
          >mdi-clock-outline</v-icon
        >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timed: Boolean,
    noAlbs: Boolean,
  },
};
</script>

<style></style>
