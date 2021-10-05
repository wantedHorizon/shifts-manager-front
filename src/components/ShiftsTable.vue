<template>
  <v-container>
    <v-row class="d-flex justify-space-between">
      <v-switch v-model="isOnlyActive" label="Only Active Shifts"></v-switch>
      <v-col cols="3">
        <v-btn block color="primary" @click="dialog=true">Register New User</v-btn>
      </v-col>
    </v-row>
    <register-user-modal :dialog="dialog" v-on:closeDialog="dialog=false">
    </register-user-modal>
    <v-data-table
      :headers="headers"
      :items="shifts"
      sort-desc
      sort-by="id"
      item-key="name"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
import { getShifts } from "../service/shifts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import RegisterUserModal from "./RegisterUserModal.vue";
// import io from 'socket.io-client';

export default {
  components: { RegisterUserModal },
  name: "EnterExit",

  data: () => ({
    shifts: [],
    isConnected:false,
    isOnlyActive: false,
    dialog: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "User ID", value: "user_id" },
      { text: "Enter Time", value: "enter" },
      { text: "Exit Time", value: "exit" },
      { text: "Logged In Time", value: "time" },
    ],
  }),
  sockets: {
     connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    completeUpdate() {
     console.log("update");
      this.getUpdatedShifts();

    }
  },
  watch: {
    isOnlyActive: function () {
      this.getUpdatedShifts();
    },
  },
  methods: {
    getUpdatedShifts: async function () {
      const data = await getShifts();

      const newShifts = data
        .filter((shift) => !this.isOnlyActive || !shift.exit)
        .map((shift) => {
          const { id, enter, exit, user_id } = shift;
          const date1 = dayjs(enter);
          let date2 = exit ? dayjs(exit) : dayjs();

          dayjs.extend(utc);
          const time = dayjs
            .utc(date2.unix() - date1.unix() * 1000)
            .format("HH:mm");

          return { id, user_id, enter, exit, time };
        });
      this.shifts = [...newShifts];
    },
 
  },
  mounted: function () {
    this.getUpdatedShifts();

  },
};
</script>

<style scoped>
</style>
