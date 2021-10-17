<template>
  <section>
    <div class="search-grid">
      <AlbumCard v-for="(a, idx) in more" :key="a.id" :rec="a" :idx="idx" />
    </div>
  </section>
</template>

<script>
import AlbumCard from "../components/AlbumCard.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["more"]),
  },
  components: { AlbumCard },
};
</script>

<style>
section {
  padding: 76px 32px 0px 32px;
}
.search-grid {
  grid-gap: 24px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
.collection-title {
  color: #fff;
  overflow: hidden;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 28px;
}
</style>
