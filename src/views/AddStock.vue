<template>
  <div>
    <MainBox
      ><v-tabs fixed-tabs dark>
        <v-tab @click="type = 'stock'">Stock</v-tab>
        <v-tab @click="type = 'dividend'">Dividend</v-tab>
      </v-tabs>

      <AddBuy v-if="type == 'stock'"/>
      <AddDividend v-else
    /></MainBox>
  </div>
</template>

<script>
import AddBuy from "@/components/AddBuy";
import MainBox from "@/components/MainBox";
import AddDividend from "@/components/AddDividend";

export default {
  data() {
    return {
      type: "stock"
    };
  },
  components: {
    AddBuy,
    MainBox,
    AddDividend
  }
};
</script>

<style lang="scss" scoped></style>
