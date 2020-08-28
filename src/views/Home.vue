<template>
  <div>
    <v-tabs fixed-tabs dark>
      <v-tab @click="type = 'buy'">Buy</v-tab>
      <v-tab @click="type = 'sell'">Sell</v-tab>
    </v-tabs>
    <AddBuy v-bind:type="type" />
  </div>
</template>

<script>
import AddBuy from "@/components/AddBuy";

export default {
  data() {
    return {
      type: "buy",
    };
  },
  components: {
    AddBuy,
  },
};
</script>

<style lang="scss" scoped></style>
