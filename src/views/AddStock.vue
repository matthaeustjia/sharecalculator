<template>
  <div>
    <v-tabs fixed-tabs dark>
      <v-tab @click="type = 'stock'">Stock</v-tab>
      <v-tab @click="type = 'dividend'">Dividend</v-tab>
    </v-tabs>

    <AddBuy v-if="type == 'stock'" />
  </div>
</template>

<script>
import AddBuy from "@/components/AddBuy";

export default {
  data() {
    return {
      type: "stock",
    };
  },
  components: {
    AddBuy,
  },
};
</script>

<style lang="scss" scoped></style>
