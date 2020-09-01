<template>
  <div>
    Holding
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Price</th>
            <th class="text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="holding in isNotEmptyHoldings" :key="holding.shareName">
            <td>{{ holding.shareName }}</td>
            <td>{{ holding.quantity }}</td>
            <td>${{ getSharePrice(holding.shareName) }}</td>
            <td>${{ getSharePrice(holding.shareName) * holding.quantity }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  methods: {
    getSharePrice(shareName) {
      let getSharePriceByName = this.sharePrice.find(
        share => share.shareName == shareName
      );
      return getSharePriceByName.price;
    }
  },
  data() {
    return {
      price: "",
      sharePrice: this.$store.state.sharePrice,
      holdings: this.$store.state.holdings,
      isNotEmptyHoldings: this.$store.getters.isNotEmptyHoldings
    };
  }
};
</script>

<style lang="scss" scoped></style>
