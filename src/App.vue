<template>
  <v-app>
    <v-main>
      <v-container class="header">
        <img height="24" width="24" src="/img/icons/favicon.ico" />
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
    rgba(22, 6, 102, 0.8),
    rgba(14, 6, 65, 0.8)
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
