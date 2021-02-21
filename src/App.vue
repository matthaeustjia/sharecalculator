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
import { auth } from "@/firebase";

export default {
  name: "App",

  components: {
    BottomNavigation
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.$store.commit("setUser", user);
      this.$router.push("/");
    });
  }
};
</script>
<style lang="scss">
.bg-red {
  color: red;
}
.bg-green {
  color: green;
}
</style>
