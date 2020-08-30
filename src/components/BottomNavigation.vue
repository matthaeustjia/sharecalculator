<template>
  <v-bottom-navigation v-if="user" app color="teal">
    <v-btn to="/">
      <v-icon>add_shopping_cart </v-icon>
    </v-btn>

    <v-btn to="/recent">
      <span>Recent</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn to="/orders">
      <v-icon>filter_list</v-icon>
    </v-btn>
    <v-btn to="/management">
      <v-icon>build</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped></style>
