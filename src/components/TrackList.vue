<template>
  <div class="flex content-spacing flex-col">
    <div class="table-head" style="margin-bottom: 16px; z-index: 10">
      <span class="list-title">Топ треків цього місяця</span>
      <div class="flex justify-beetween mt-1">
        <span class="normal-font flex-1">Видні тільки для тебе</span>
        <span class="more" v-if="trackList.length > 4">Ще</span>
      </div>
    </div>
    <ul style="z-index: 10">
      <li
        class="flex justify-beetween relative py-2 px-2 items-center lich"
        v-for="(li, idx) in trackShow"
        :key="idx"
      >
        <v-icon class="only-hover none">mdi-play</v-icon>
        <span class="w-6 normal-text index text-center">{{ idx + 1 }}</span>
        <div style="width: 40px" class="mx-4">
          <v-img
            class="h-10 rounded-sm"
            style="width: 40px"
            contain
            :src="li.img"
          ></v-img>
        </div>
        <div class="flex flex-col" style="width: 50%">
          <span class="normal-font-lg mb-2">{{ li.title }}</span>
          <span
            class="
              normal-font
              hover:underline
              font-light
              cursor-pointer
              opacity-90
            "
            >{{ li.author }}</span
          >
        </div>
        <span class="normal-font flex-1">{{ li.description }}</span>
        <div class="flex items-center gap-4">
          <v-icon
            @click="li.liked = !li.liked"
            :style="{ color: li.liked ? '#1ed760' : '#a7a7a7' }"
            >{{ li.liked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon
          >
          <span class="normal-font">{{ li.duration }}</span>
          <v-icon class="ubuntu">mdi-dots-horizontal</v-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import doom from "../assets/doom.jpg";
export default {
  data: () => ({
    doom,
    trackList: [
      {
        title: "The only thing they fear is you",
        author: "Mick Gordon",
        liked: false,
        description: "Doom (Original Game Soundtrack)",
        duration: "4:17",
        active: false,
        img: doom,
      },
      {
        title: "The only thing they fear is you",
        author: "Mick Gordon",
        liked: false,
        description: "Doom (Original Game Soundtrack)",
        duration: "4:17",
        active: false,
        img: doom,
      },
      {
        title: "The only thing they fear is you",
        author: "Mick Gordon",
        liked: false,
        description: "Doom (Original Game Soundtrack)",
        duration: "4:17",
        active: false,
        img: doom,
      },
      {
        title: "The only thing they fear is you",
        author: "Mick Gordon",
        liked: false,
        description: "Doom (Original Game Soundtrack)",
        duration: "4:17",
        active: false,
        img: doom,
      },
      {
        title: "The only thing they fear is you",
        author: "Mick Gordon",
        liked: false,
        description: "Doom (Original Game Soundtrack)",
        duration: "4:17",
        active: false,
        img: doom,
      },
      {
        title: "The only thing they fear is you",
        author: "Mick Gordon",
        liked: false,
        description: "Doom (Original Game Soundtrack)",
        duration: "4:17",
        active: false,
        img: doom,
      },
      {
        title: "The only thing they fear is you",
        author: "Mick Gordon",
        liked: false,
        description: "Doom (Original Game Soundtrack)",
        duration: "4:17",
        active: false,
        img: doom,
      },
    ],
  }),
  computed: {
    trackShow() {
      return this.trackList.slice(0, 4);
    },
  },
};
</script>

<style lang="scss" scoped>
.z-50 {
  z-index: 50 !important;
}
.lay2 {
  background-color: rgb(160, 176, 224);

  height: 232px;
  position: absolute;
  width: 100%;

  border-bottom: 2px solid #727272;
}
.lay3 {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5973739837731968) 2%,
    rgba(18, 18, 18, 1) 100%
  );
  height: 232px;
  position: absolute;
  width: 100%;
}
.font-light {
  font-weight: 300 !important;
}
.none {
  display: none;
}
.normal-font-lg {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 16px;
  text-overflow: ellipsis;
  text-transform: none;
}
.ubuntu {
  opacity: 0;
}
.lich {
  cursor: pointer;
  &:hover {
    background: hsla(0, 0%, 100%, 0.07);
    .ubuntu {
      opacity: 1 !important;
    }
    .index {
      display: none;
    }
    .only-hover {
      display: block;
    }
  }
}
</style>

<style lang="scss" scoped>
.w-10 {
  width: 40px;
}
.user-avatar {
  z-index: 10;
  width: 232px;
  height: 232px;
  @media (max-width: 969px) {
    width: 192px;
    height: 192px;
  }
}
.shadow-av {
  box-shadow: 5px 5px 40px #242424;
}
.user-profile {
  position: relative;
  align-items: flex-end;
  height: 340px;
  background-color: rgb(160, 176, 224);
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
    rgba(0, 0, 0, 0.60773812943146) 100%
  );
}
.user-credentials {
  padding: 0px 0px 20px 30px;
}
.prof-text {
  font-weight: 700;
  font-size: 12px;
  margin-top: 4px;
  text-transform: uppercase;
}
.prof-title {
  padding: 0.08em 0px;
  visibility: visible;
  width: 100%;
  line-height: 96px;
  font-size: 96px;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 96px;
  text-transform: none;
}
.spaan {
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 16px;
  text-transform: none;
}
.dots-w {
  padding: 10px 10px 24px 36px;
  font-size: 38px;
  position: relative;
}
.list-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 35px;
  text-transform: none;
}
.normal-font {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 16px;
  text-transform: none;
  text-overflow: ellipsis;
}
.more {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 16px;
  text-transform: uppercase;
}
.content-spacing {
  padding: 6px 32px 24px 32px;
}
</style>
