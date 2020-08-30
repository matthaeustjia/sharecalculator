<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <BottomNavigation />
  </v-app>
</template>

<script>
import BottomNavigation from "./components/BottomNavigation";

export default {
  name: "App",

  components: {
    BottomNavigation,
  },

  data: () => ({
    //
  }),
};
</script>
