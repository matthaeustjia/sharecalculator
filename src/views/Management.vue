<template>
  <v-container>
    <AddStock />
    <RemoveStock />
  </v-container>
</template>

<script>
import AddStock from "@/components/AddStock";
import RemoveStock from "@/components/RemoveStock";

export default {
  data() {
    return {
      showAdd: true
    };
  },
  components: {
    AddStock,
    RemoveStock
  }
};
</script>

<style lang="scss" scoped></style>
