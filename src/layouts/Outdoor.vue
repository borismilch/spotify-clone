<template>
  <div
    class="
      bg-sp-dark bg-gradient-to-b
      h-screen
      flex
      items-center
      justify-center
    "
  >
    <router-view @pageMessage="pageMessage($event)" />
  </div>
</template>

<script>
export default {
  methods: {
    pageMessage(e) {
      this.$emit("pageMessage", e);
    },
  },
};
</script>

<style></style>
