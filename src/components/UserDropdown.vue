<template>
  <div class="relative z-50" style="width: 170px">
    <button
      @click="isDropdown = !isDropdown"
      class="bg-sp-lignt rounded-full px-3 py-2 flex items-center self-end"
    >
      <img
        :src="user.avatar"
        alt=""
        class="rounded-full object-cover h-6 w-6 mr-2"
      />
      <p class="text-white font-semibold text-xs">{{ user.name }}</p>
      <v-icon class="text-white ml-4">{{ dro }}</v-icon>
    </button>
    <ul
      v-if="isDropdown"
      @click="isDropdown = false"
      class="absolute p-1 bg-sp-lignt w-full rounded mt-1 font-bold z-50"
    >
      <router-link
        class="dropdown-li block z-50"
        active-class="active3"
        exact
        @click="logout"
        tag="li"
        to="/auth?message=logOut"
      >
        <v-icon>mdi-logout</v-icon>
        Вийти</router-link
      >
      <router-link
        class="dropdown-li z-50"
        active-class="active3"
        exact
        tag="li"
        to="/user"
      >
        <v-icon>mdi-account-wrench</v-icon>
        Профіль</router-link
      >
      <router-link
        class="dropdown-li z-50"
        active-class="active3"
        exact
        tag="li"
        to="/register"
      >
        <v-icon>mdi-account</v-icon>
        Аккаунт</router-link
      >
      <a
        class="dropdown-li z-50"
        active-class="active3"
        exact
        tag="li"
        href="https://github.com/Saloed2"
      >
        <v-icon class="mr-2">mdi-github</v-icon>
        GitHub</a
      >
    </ul>
  </div>
</template>

<script>
import debil from "../assets/debil.jpg";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    debil,
    isDropdown: false,
  }),

  computed: {
    ...mapGetters(["user"]),
    dro() {
      return this.isDropdown ? "menu-up" : "menu-down";
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
.v-application ul {
  padding: 0.5rem !important;
}
.self-end {
  margin-left: auto;
}
</style>
