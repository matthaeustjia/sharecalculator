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
            <th class="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="holding in isNotEmptyHoldings" :key="holding.shareName">
            <td>{{ holding.shareName }}</td>
            <td>{{ holding.quantity }}</td>
            <td>150</td>
            <td>150</td>
            <v-btn @click="getStockPrice()">GET DATA</v-btn>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    getStockPrice() {
      axios
        .get(
          "http://api.marketstack.com/v1/eod?access_key=5d4a2a7d1a39e3a6e78c679405d86611&symbols=KGN.XASX&fbclid=IwAR2QlXIujN1jbxYHqoM-w-YkpO2WcPxjmbtwRpin8N7GYKdAFzp9LWsiYtc"
        )
        .then(response => (this.price = response));
    }
  },
  data() {
    return {
      price: "",
      holdings: this.$store.state.holdings,
      isNotEmptyHoldings: this.$store.state.isNotEmptyHoldings
    };
  }
};
</script>

<style lang="scss" scoped></style>
