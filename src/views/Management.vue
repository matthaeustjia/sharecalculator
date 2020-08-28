<template>
  <div>
    <v-tabs fixed-tabs dark>
      <v-tab @click="showAdd = true">Add Stock</v-tab>
      <v-tab @click="showAdd = false">Remove Stock</v-tab>
    </v-tabs>
    <AddStock v-if="showAdd" />
    <RemoveStock v-else />
  </div>
</template>

<script>
import AddStock from "@/components/AddStock";
import RemoveStock from "@/components/RemoveStock";

export default {
  data() {
    return {
      showAdd: true,
    };
  },
  components: {
    AddStock,
    RemoveStock,
  },
};
</script>

<style lang="scss" scoped></style>
