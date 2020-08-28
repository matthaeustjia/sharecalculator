<template>
  <div>
    <v-tabs fixed-tabs dark>
      <v-tab @click="showAdd = true">Add Stock</v-tab>
      <v-tab @click="showAdd = false">Remove Stock</v-tab>
    </v-tabs>
    <AddStock v-if="showAdd" />
    <AddSell v-else />
  </div>
</template>

<script>
import AddStock from "@/components/AddStock";
import AddSell from "@/components/AddSell";

export default {
  data() {
    return {
      showAdd: true,
    };
  },
  components: {
    AddStock,
    AddSell,
  },
};
</script>

<style lang="scss" scoped></style>
