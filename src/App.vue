<template>
  <v-app dark>
    <v-content>
      <router-view></router-view>
    </v-content>
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
