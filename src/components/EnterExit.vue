<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4 mt-6">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Shift Manager
        </h1>

        <p class="subheading font-weight-regular">
          Please Register your Id to enter/exit the system
        </p>
      </v-col>
    </v-row>
    <v-row class="login-row px-4 enter">
      <v-col cols="12"> <h3 class="title">Enter your ID to Login:</h3> </v-col>
      <v-col class="text-holder" cols="6" sm="6" md="3">
        <v-text-field
          v-model="id1"
          small
          label="ID"
          class="text-input"
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="5" sm="4" md="1">
        <v-btn
          depressed
          color="primary"
          @click="onEnterClick"
          :disabled="this.id1.length !== 9"
        >
          Enter
        </v-btn>
      </v-col>
      <v-col cols="5" sm="4" md="1">
        <v-btn
          @click="onExitClick"
          depressed
          color="error"
          :disabled="this.id1.length !== 9"
        >
          Exit
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { enter, exit } from "../service/shifts";
export default {
  name: "EnterExit",

  data: () => ({
    id1: "",
    id2: "",
  }),
  methods: {
    onEnterClick: async function () {
      const data = await enter(this.id1);

      if (data.err) {
        alert("Entring Failed Try another ID");
      } else {
        alert(`user ${data.user_id} enterd successfuly!`);
      }

      this.id1 = "";
    },

    onExitClick: async function () {
      const data = await exit(this.id1);

      if (data.err) {
        alert("Entring Failed Try another ID");
      } else {
        alert(`user ${data.user_id} exited successfuly!`);
      }
      this.id1 = "";
    },
  },
};
</script>

<style scoped>
.login-row {
  background: #f4f4f4;
  display: flex;
  align-items: center;
}

.title {
  font-size: 18px;
  color: #1d1d1d;
  width: 220px;
}
.text-holder {
  height: 80px;
}

.text-input {
  height: 40pxs;
}

.enter {
  /* border-bottom: 1px solid #1d1d1d; */
}
</style>
