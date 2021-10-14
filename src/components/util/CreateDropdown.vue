<template>
  <div
    class="relative z-50"
    style="width: 220px; transform: translate(10%, 10px)"
  >
    <ul
      v-if="dropdown"
      @click="$emit('dropdown')"
      class="absolute p-1 bg-sp-lignt w-full rounded mt-1 font-bold z-50"
    >
      <li class="dropdown-li z-50" @click="$emit('remove')">Видалити</li>
      <li class="dropdown-li z-50" @click="$emit('sendToList')">
        Перенести у доріжку
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({}),
  props: {
    dropdown: Boolean,
  },
  computed: {
    ...mapGetters(["user"]),
    dro() {
      return this.dropdown ? "menu-up" : "menu-down";
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
