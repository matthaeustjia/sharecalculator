<template>
  <div>
    <v-bottom-navigation
      background-color="blue-grey lighten-4"
      fixed
      v-if="user"
      color="blue"
    >
      <v-btn to="/">
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn to="/add">
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
      <v-btn to="/orders">
        <v-icon>filter_list</v-icon>
      </v-btn>
      <v-btn to="/calculator">
        <v-icon>credit_card</v-icon>
      </v-btn>
      <v-btn to="/management">
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn @click="signOut()">
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

<style lang="scss" scoped></style>
