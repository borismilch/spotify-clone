<template>
  <v-dialog v-model="dialog" width="524">
    <div
      style="background-color: #282828 !important"
      class="moda-header flex justify-between"
    >
      <h1 class="list-title">Дані Плейліста</h1>
      <v-btn text @click="$emit('onDialog', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <div
      style="padding: 0px 24px 24px 24px; background-color: #282828 !important"
    >
      <div class="flex">
        <div class="user-avatar" style="position: relative">
          <v-img
            width="100%"
            height="100%"
            :src="img"
            class="shadow-av"
            alt=""
          />
          <v-overlay
            opacity="0.65"
            class="profile-overlay"
            :absolute="true"
            :value="true"
          >
            <div class="flex flex-col gap-14">
              <span class="font-normal hover:underline">Вибрати фото</span>
              <input
                type="file"
                style="width: 133px"
                class="absolute opacity-0"
                @change="getFile($event)"
              />
              <v-icon style="font-size: 60px">mdi-lead-pencil</v-icon>
              <span class="font-normal hover:underline" @click="deleteFile"
                >Видалити фото</span
              >
            </div>
          </v-overlay>
        </div>
        <div
          class="modal-actions ml-3 flex flex-col justify-center flex-1"
          style="gap-16px"
        >
          <input type="text" class="modal-input" name="" v-model="title" />
          <v-textarea
            background-color="rgba(255, 255, 255, 0.1)"
            v-model="desc"
            label="Description"
            auto-grow
            outlined
            rows="3"
            row-height="25"
            shaped
          ></v-textarea>
          <button
            class="modal-button"
            :disabled="changing"
            @click="changeProfile"
          >
            Зберегти
          </button>
        </div>
      </div>
      <div style="margin-top: 16px">
        <p class="modal-sub">
          Продолжая, ты предоставляешь Spotify доступ к выбранному изображению.
          Пожалуйста, не загружай файлы, которые ты не имеешь права
          распространять.
        </p>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import analyze from "rgbaster";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    desc: "",
    title: "",
    img: "",
    changing: false,
  }),
  computed: {
    ...mapGetters(["user", "playlists"]),
    current() {
      return this.playlists.find((p) => p.id === this.$route.params.id);
    },
  },
  props: {
    dialog: Boolean,
    defaultImg: String,
  },
  watch: {
    "$route.params.id"() {
      this.loadData();
    },
  },
  methods: {
    analyze,
    async changeProfile() {
      this.changing = true;
      try {
        const playlist = {
          img: this.img,
          title: this.title,
          description: this.desc,
        };
        await this.$store.dispatch("updatePlaylist", [
          this.current.id,
          playlist,
        ]);

        this.backColor = (await this.analyze(this.img))[0].color;
        this.$emit("changeStyle", this.backColor);
        this.$emit("pageMessage", "PLAYLIST_CHANGED");
        this.$emit("onDialog", false);
      } catch (e) {
        this.$emit("pageMessage", e.code);
        console.log(e);
      } finally {
        this.changing = false;
      }
    },
    getFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setTimeout(() => {
        this.img = reader.result;
      }, 500);
    },
    deleteFile() {
      this.img = this.defaultImg;
    },
    async loadData() {
      this.img = this.current.img;
      this.title = this.current.title;
      this.desc = this.current.description;
      this.backColor = (await this.analyze(this.img))[0].color;
      this.$emit("changeStyle", this.backColor);
    },
  },
  async mounted() {
    this.loadData();
  },
};
</script>

<style></style>

<style lang="scss">
.modal-button {
  cursor: pointer;
  margin-left: auto;
  width: 130px;
  padding: 6px 0px;
  background-color: #fff;
  color: #181818;
  border: 2px solid transparent;
  border-radius: 500px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.76px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  -webkit-transition: all 33ms cubic-bezier(0.3, 0, 0, 1);
  transition: all 33ms cubic-bezier(0.3, 0, 0, 1);
  white-space: nowrap;
  transition: 0.1s;
  &:hover {
    transform: scale(1.1);
  }
  &:disabled {
    opacity: 0.4;
  }
}
.list-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 28px;
  text-transform: none;
}
.modal-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  height: 40px;
  outline: none;
  margin-bottom: 16px;
  padding: 0 12px;
  width: 100%;
}
.moda-header {
  padding: 24px;
}
.profile-overlay {
  opacity: 0;
  cursor: pointer;
}
.user-avatar {
  box-shadow: 5px 5px 30px #181818;
  border-radius: 6px;
  z-index: 10;
  width: 180px;
  height: 180px;
  @media (max-width: 969px) {
    width: 152px;
    height: 152px;
  }
  &:hover {
    .profile-overlay {
      opacity: 1;
    }
  }
}
.modal-sub {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: normal;
  line-height: 16px;
  text-transform: none;
}
</style>
