<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        Shift Manager
      </div>

      <v-spacer></v-spacer>

   
    </v-app-bar>

    <v-main>
      <EnterExit />
      <shifts-table > </shifts-table> 
    </v-main>
  </v-app>
</template>

<script>
import EnterExit from "./components/EnterExit";
import ShiftsTable from './components/ShiftsTable.vue';

export default {
  name: "App",

  components: {
    EnterExit,
    ShiftsTable,
  },

  data: () => ({
    //
  }),
};
</script>
