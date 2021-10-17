<template>
  <v-col cols="12" md="6">
    <v-card class="p-7 bg-dark">
      <v-card-title class="text-h5 font-weight-bold"> Реєстрація </v-card-title>
      <v-form
        @submit.prevent="submitHanler"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          outlined
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Ім'я"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password1"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="Пароль"
          hint="At least 8 characters"
          outlined
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>

        <v-text-field
          v-model="password2"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          outlined
          label="Пароль"
          hint="At least 8 characters"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>
        <v-row>
          <v-col cols="12" md="5">
            <v-btn
              :disabled="!valid || hold"
              color="primary"
              class="px-3"
              width="100%"
              type="submit"
              @click="validate"
            >
              Зареєструватись
            </v-btn>
          </v-col>
          <v-col cols="12" md="5">
            <v-btn
              color="primary"
              class="px-3"
              width="100%"
              @click="$router.push('/auth')"
            >
              Авторизація
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
export default {
  metaInfo: { title: `Registration | Builofy ` },
  data: () => ({
    hold: false,
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show: false,
    password1: "",
    password2: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async submitHanler() {
      this.validate();
      this.hold = true;
      if (this.valid && this.password1 === this.password2) {
        const formData = {
          name: this.name,
          email: this.email,
          password: this.password1,
        };
        try {
          await this.$store.dispatch("regUser", formData);
          this.$router.push("/");
        } catch (e) {
          this.$emit("pageMessage", e.code);
          this.hold = false;
        }
      } else {
        this.$emit("pageMessage", "NOT_SAME_PASSWORDS");
        this.hold = false;
      }
    },
  },
};
</script>

<style lang="scss">
.p-7 {
  padding: 20px;
}
</style>
