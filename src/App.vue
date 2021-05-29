<template>
  <v-app>
    <v-main>
      <v-container fluid class="header">
        <img height="24" width="24" src="/img/icons/favicon.ico" />
        <span class="font-header"> Trading Account </span>
      </v-container>
      <v-container>
        <router-view></router-view>
      </v-container>
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
body {
  padding-bottom: 2.5rem;
}
.header {
  height: 15vh;
  background-image: linear-gradient(
    rgba(10, 13, 190, 0.8),
    rgba(12, 9, 192, 0.8)
  );
  padding-bottom: 5rem;
  margin-bottom: -5rem;
}
.font-header {
  font-size: 1.4rem;
  font-weight: 500;
  color: white;
  text-shadow: 0.04rem 0 0 #000, 0 -0.04rem 0 #000, 0 0.04rem 0 #000,
    -0.04rem 0 0 #000;
}
.text-red {
  color: red;
}
.text-green {
  color: green;
}
</style>
