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
};
</script>
<style lang="scss">
.bg-red {
  background-color: red;
}
.bg-green {
  background-color: green;
}
</style>
