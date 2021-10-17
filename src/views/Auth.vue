<template>
  <v-col cols="12" md="5">
    <v-card class="p-7 bg-dark">
      <v-card-title class="text-h5 font-weight-bold">
        Авторизація
      </v-card-title>
      <v-form
        @submit.prevent="submitHandler"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
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
        <v-row>
          <v-btn
            :disabled="!valid || hold"
            color="primary"
            class="ml-4"
            type="submit"
            @click="validate"
          >
            Вхід
          </v-btn>

          <v-btn
            color="primary"
            class="ml-4"
            type="submit"
            @click="$router.push('/register')"
          >
            Реєстрація
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
export default {
  metaInfo: { title: "Auth | Builofy" },
  data: () => ({
    hold: false,
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show: false,
    password: "",
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
    async submitHandler() {
      this.validate();
      this.hold = true;
      if (this.valid) {
        try {
          const formData = {
            email: this.email,
            password: this.password,
          };
          await this.$store.dispatch("authUser", formData);
          this.$router.push("/");
          this.$emit("pageMessage", "USER_SINGED_IN");
        } catch (e) {
          console.log(e.code);
          this.$emit("pageMessage", e.code);
          this.hold = false;
        }
      } else {
        this.$emit("pageMessage", "UNCORRECT_DATA");
        this.hold = false;
      }
    },
  },
};
</script>

<style>
.p-7 {
  padding: 12px 30px 27px 30px;
}
.bg-dark {
  color: white !important;
  background-color: #181818 !important;
}
</style>
