<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <GoodMorning @styleChanged="$emit('changeStyle', $event)" />
      <div style="padding: 0px 32px 0px 32px; gap: 16px" class="flex flex-col">
        <Recomends
          :title="'All Albums'"
          :template="albums"
          :isAuthors="false"
          :group="'recent-home'"
        />
        <Recomends
          :title="'New Albums'"
          :template="newAlbums"
          :group="'newest-home'"
          :isAuthors="false"
        />
        <div class="flex flex-col">
          <h1
            class="text-2xl font-bold text-white tracking-wider hover:underline"
            style="margin: 20px"
          >
            Виконавці
          </h1>
          <div class="search-grid">
            <AuthorCard
              v-for="user in users"
              :key="user.id"
              :group="'authors'"
              :user="user"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorCard from "../components/AuthorCard.vue";
import music from "../utils/music";
import albs from "../utils/albums";
import Loader from "../components/Loader.vue";
import { mapGetters } from "vuex";
import Recomends from "../components/Recomends.vue";
import GoodMorning from "../components/Recomendations.vue";
export default {
  metaInfo: { title: `Home | Builofy ` },
  components: {
    Recomends,
    AuthorCard,
    GoodMorning,
    Loader,
  },

  data: () => ({
    albs,
    music,
    loading: true,
  }),
  computed: {
    ...mapGetters(["albums", "user", "users"]),
    newAlbums() {
      return [...this.albums].reverse();
    },
  },
  mounted() {
    setTimeout(async () => {
      await this.$store.dispatch("fetchPlaylists");
      await this.$store.dispatch("fetchUsers");
      this.loading = false;
    }, 200);
  },
};
</script>

<style lang="scss">
body {
  background-color: #121212 !important;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #d1d1d1 !important;
  margin-top: -4px;
}
.search-grid {
  grid-gap: 24px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
.lay {
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
  background: rgba(18, 18, 18, 0.5);
  background: linear-gradient(
    180deg,
    rgba(25, 24, 24, 0.6054692218684349) 2%,
    rgba(18, 18, 18, 1) 100%
  );
}
</style>
