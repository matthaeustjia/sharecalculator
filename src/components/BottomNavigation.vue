<template>
  <v-bottom-navigation v-if="user" app color="blue">
    <v-btn to="/">
      <v-icon>history</v-icon>
    </v-btn>

    <v-btn to="/add">
      <v-icon>add_shopping_cart</v-icon>
    </v-btn>

    <v-btn to="/orders">
      <v-icon>filter_list</v-icon>
    </v-btn>
    <v-btn to="/management">
      <v-icon>build</v-icon>
    </v-btn>
    <v-btn @click="signOut()">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  methods: {
    signOut() {
      this.$store.commit("setUser", ""), this.$router.push("/login");
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped></style>
