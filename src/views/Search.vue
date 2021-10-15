<template>
  <div>
    <Loader v-if="loading" />
    <section v-else>
      <Fade>
        <div v-if="!searchInCategories">
          <h2 class="search-title">Топ жанрів</h2>
          <v-col
            cols="12"
            md="4"
            style="padding: 0px; margin: 20px 0px 20px 0px"
          >
            <router-link
              to="/genre/metal"
              style="
                height: 220px;
                padding: 0px;
                background: rgb(119, 119, 119);
              "
              tag="div"
              class="gategory"
            >
              <h3 class="category-title-big">Метал</h3>
              <img :src="doom" class="gategory-img" alt="" />
            </router-link>
          </v-col>
          <h2 class="search-title mt-3">Інші категорії</h2>
          <div class="search-grid my-6">
            <router-link
              v-for="c in genres"
              :key="c.img + c.title"
              :to="'/genre/' + c.title.toLowerCase()"
              tag="div"
              class="gategory"
              :style="{ background: c.color }"
            >
              <h3 class="category-title font-bold">{{ c.title }}</h3>
              <img
                :src="c.img"
                style="width: 100px; height: 100px"
                class="gategory-img gategory-img--sm"
                alt=""
              />
            </router-link>
          </div>
        </div>
      </Fade>
      <div v-if="searchInCategories">
        <TrackList
          @pageMessage="$emit('pageMessage', $event)"
          :tracks="searchingTracks"
        >
          <div class="flex flex-col">
            <ListHeader />
            <span class="ml-2" v-if="!searchingTracks.length"
              >По вашому запросу нічого не знайдено</span
            >
          </div>
        </TrackList>
      </div>
    </section>
  </div>
</template>

<script>
import { normalize } from "../utils/normalize";
import { mapGetters } from "vuex";
import ListHeader from "../components/util/ListHeader.vue";
import TrackList from "../components/TrackList.vue";
import Loader from "../components/Loader.vue";
import Fade from "../components/util/transition.vue";
import doom from "../assets/categories/metaljpg.jpg";
import genres from "../utils/categories";
export default {
  data: () => ({
    loading: true,
    doom,
    genres,
  }),
  methods: { normalize },
  props: {
    searchInCategories: String,
  },
  components: { Fade, Loader, TrackList, ListHeader },
  mounted() {
    this.loading = false;
  },
  computed: {
    ...mapGetters(["albums"]),
    normalQuery() {
      return this.normalize(this.searchInCategories);
    },
    searchingTracks() {
      return this.allTracks
        .filter((t) => {
          return (
            this.normalize(t.title).includes(this.normalQuery) ||
            this.normalize(t.album).includes(this.normalQuery) ||
            this.normalize(t.author).includes(this.normalQuery)
          );
        })

        .map((t) => {
          const alb = this.albums.find((a) => a.id === t.parent);
          return { ...t, albumImg: alb.src, desc: alb.title };
        });
    },
    allTracks() {
      return this.albums.map((a) => a.tracks).flat(1);
    },
  },
};
</script>

<style lang="scss">
section {
  padding: 76px 32px 0px 32px;
}
.search-grid {
  grid-gap: 24px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
.search-title {
  color: #fff;
  overflow: hidden;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 28px;
}
.category-title-big {
  font-size: 40px;
  letter-spacing: -0.04em;
  line-height: 1.3em;
  font-weight: 600;
  max-width: 100%;
  overflow-wrap: break-word;
  padding: 16px;
  position: absolute;
}
.category-title {
  font-size: 24px;
  letter-spacing: -0.04em;
  line-height: 1.3em;
  max-width: 100%;
  overflow-wrap: break-word;
  padding: 16px;
  position: absolute;
}
.gategory {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
  padding-bottom: 100%;
}
.gategory-img {
  right: 0;
  transform: rotate(25deg) translate(18%, -2%);
  bottom: 0;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  height: 128px;
  position: absolute;
  width: 128px;
  object-fit: cover;
  object-position: center center;
}
</style>
