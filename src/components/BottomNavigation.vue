<template>
  <v-bottom-navigation :value="activeBtn" grow color="teal">
    <v-btn to="/">
      <span>Add</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-btn to="/recent">
      <span>Recent</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn to="/orders">
      <span>Orders</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-btn to="/management">
      <span>Management</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped></style>
