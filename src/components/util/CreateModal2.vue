<template>
  <v-dialog v-model="dialog" width="524">
    <div
      style="background-color: #282828 !important"
      class="moda-header flex justify-between"
    >
      <h1 class="list-title">Нова пісня</h1>
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
            :src="defaultImg"
            class="shadow-av"
            alt=""
          />
        </div>
        <div
          class="modal-actions ml-3 flex flex-col justify-center flex-1"
          style="gap-16px"
        >
          <input
            type="text"
            placeholder="Song name"
            class="modal-input"
            name=""
            v-model="title"
          />
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
          <div class="flex">
            <button class="modal-button" :disabled="changing">
              <input
                type="file"
                style="width: 133px"
                class="absolute opacity-0"
                @change="getFile($event)"
              />
              Вибрати
            </button>
            <button
              @click="addSongToAlbum"
              class="modal-button"
              :disabled="changing || !hasFile"
            >
              Зберегти
            </button>
          </div>
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
import { mapGetters } from "vuex";
export default {
  data: () => ({
    desc: "",
    title: "",
    hasFile: false,
    audio: "",
    changing: false,
  }),
  computed: {
    ...mapGetters(["user", "playlists"]),
  },
  props: {
    dialog: Boolean,
    defaultImg: String,
    current: Object,
  },
  watch: {
    "$route.params.id"() {
      this.loadData();
    },
  },
  methods: {
    async addSongToAlbum() {
      console.log("hhh");
      this.changing = true;
      try {
        const cong = new Audio(this.audio);
        cong.onloadedmetadata = () => {
          const playlist = {
            audio: this.audio,
            title: this.title,
            description: this.desc,
            author: this.user.name,
            ref: this.ref,
            duration: cong.duration,
          };
          this.$emit("addSongToAlbum", playlist);

          this.hasFile = false;
          this.audio = null;
          this.title = this.description = this.ref = "";

          this.$emit("onDialog", false);
        };
      } catch (e) {
        this.$emit("pageMessage", e.code);
        console.log(e);
      } finally {
        this.changing = false;
      }
    },
    log() {
      console.log("dd;ll");
    },
    getFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      if (!this.title)
        this.title = file.name.split(".")[0].split("-").join(" ");
      this.ref = file.name.split(".")[0];
      this.hasFile = true;

      reader.readAsDataURL(file);
      setTimeout(() => {
        this.audio = reader.result;
      }, 500);
    },
    async loadData() {
      this.title = this.current.title;
      this.desc = this.current.description;
    },
  },
  async mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss">
.modal-button {
  cursor: pointer;
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
