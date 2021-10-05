<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-card class="px-4">
        <v-card-text>
          <v-form ref="loginForm" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="firstName"
                  :rules="[rules.required]"
                  label="First Name"
                  maxlength="20"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="lastName"
                  :rules="[rules.required]"
                  label="Last Name"
                  maxlength="20"
                  required
                ></v-text-field>
              </v-col>

              <!-- <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="lastName"
                  :rules="[rules.required]"
                  label="Last Name"
                  maxlength="20"
                  required
                ></v-text-field>
              </v-col> -->

              <v-col cols="12">
                <v-text-field
                  v-model="id"
                  :rules="[rules.required, rules.idLength]"
                  label="ID"
                  type="number"
                  maxlength="20"
                  required
                ></v-text-field>
              </v-col>

              <v-spacer></v-spacer>
              <v-row class="d-flex justify-space-between"> </v-row>
              <v-col>
                <v-btn x-large @click="$emit('closeDialog')" block color="error">Cancel</v-btn>
              </v-col>
              <v-col>
                <v-btn
                  x-large
                  block
                  :disabled="!valid"
                  color="success"
                  @click="validate"
                  >Register</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
import { registerNewUser } from "../service/users";
export default {
  name: "RegisterUserModal",
  computed: {},
  props: ["dialog"],
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
        registerNewUser({
          user_id: this.id,
          firstname: this.firstName,
          lastname: this.lastName,
        })
          .then((res) => {
            if (res.user_id) {
              alert(`user ${res.user_id} was created`);
            } else {
              throw "Registration failed";
            }
          })
          .catch(() => {
            alert("Registration failed");
          });

        this.reset();
      }
    },
    reset() {
      this.$refs.loginForm.reset();
    },
    resetValidation() {
      this.$refs.loginForm.resetValidation();
    },
  },
  data: () => ({
    valid: true,
    firstName: "",
    lastName: "",
    id: "",

    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 3) || "Min 3 characters",
      idLength: (v) =>
        (v && !isNaN(v) && v.toString().length === 9) ||
        "ID length must be 9 characters",
    },
  }),
};
</script>

<style scoped>
</style>
