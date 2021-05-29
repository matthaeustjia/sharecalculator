<template>
  <div>
    <v-bottom-navigation v-if="user" color="blue">
      <v-btn to="/">
        <span>Dashboard</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn to="/add">
        <span class="navigation-text">Add</span>
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
      <v-btn to="/orders">
        <span>Activity</span>
        <v-icon>filter_list</v-icon>
      </v-btn>
      <v-btn to="/calculator">
        <span>Calculator</span>
        <v-icon>credit_card</v-icon>
      </v-btn>
      <v-btn @click="signOut()">
        <span>Logout</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
import { auth } from "@/firebase";

export default {
  methods: {
    signOut() {
      auth.signOut();
      this.$store.commit("setUser", "");
      this.$router.push("/login");
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation-text {
  font-size: 0.5rem;
}
</style>
