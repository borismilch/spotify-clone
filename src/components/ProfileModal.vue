<template>
  <v-dialog v-model="dialog" width="524">
    <div
      style="background-color: #282828 !important"
      class="moda-header flex justify-between"
    >
      <h1 class="list-title">Дані профіля</h1>
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
            class="rounded-circle shadow-av"
            alt=""
          />
          <v-overlay
            opacity="0.65"
            class="profile-overlay"
            :absolute="true"
            :value="true"
            style="border-radius: 50%"
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
          <input type="text" class="modal-input" name="" v-model="name" />
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
    name: "",
    img: "",
    changing: false,
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  props: {
    dialog: Boolean,
  },
  methods: {
    analyze,
    async changeProfile() {
      this.changing = true;
      try {
        await this.$store.dispatch("changeProfile", {
          ...this.user,
          avatar: this.img,
          name: this.name,
        });

        this.backColor = (await this.analyze(this.img))[0].color;
        console.log(this.backColor);

        this.$emit("changeStyle", this.backColor);
        this.$emit("pageMessage", "profile-changed");
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
      this.img =
        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg";
    },
  },
  async mounted() {
    this.img = this.user.avatar;
    this.name = this.user.name;
    this.backColor = (await this.analyze(this.img))[0].color;
    this.$emit("changeStyle", this.backColor);
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
