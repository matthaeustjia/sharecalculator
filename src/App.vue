<template>
  <v-app>
    <v-main>
      <v-container class="header">
        <span class="logo">LOGO</span>
        <span class="font-header"> Trading Account </span>
      </v-container>
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
.header {
  height: 15vh;
  background-image: linear-gradient(
    to right bottom,
    rgba(53, 33, 151, 0.8),
    rgba(47, 24, 175, 0.8)
  );
  padding-bottom: 5rem;
  margin-bottom: -5rem;
}
.font-header {
  font-size: 1.4rem;
  font-weight: 500;
}
.bg-red {
  color: red;
}
.bg-green {
  color: green;
}
</style>
