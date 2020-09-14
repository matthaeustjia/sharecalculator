<template>
  <div>
    <v-card>
      <v-card-title class="capitalize">
        {{ type }} report
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-subtitle>
        {{ new Date(dateRanges.firstDay).toLocaleDateString() }} -
        {{ new Date(dateRanges.lastDay).toLocaleDateString() }}</v-card-subtitle
      >
      <v-card-subtitle :class="totalProfit > 0 ? 'bg-green' : 'bg-red'">
        Profit ${{
          totalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </v-card-subtitle>
      <v-card-subtitle>
        Buy ${{ totalBuy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
      </v-card-subtitle>
      <v-card-subtitle>
        Sell ${{ totalSell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
      </v-card-subtitle>
      <v-card-subtitle class="bg-red">
        Fees ${{
          totalBrokerageFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </v-card-subtitle>
      <v-card-subtitle>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-subtitle>

      <v-data-table
        dense
        hide-default-footer
        disable-pagination
        :headers="headers"
        :items="orderHistory"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Share",
          align: "start",
          sortable: false,
          value: "shareName",
        },
        { text: "Price", value: "price" },
        { text: "Quantity", value: "quantity" },
        { text: "Total", value: "carbs" },
        { text: "Brokerage", value: "brokerageFee" },
        { text: "Date", value: "date" },
      ],
    };
  },
  computed: {
    orderList() {
      return this.$store.getters.isSold;
    },
    orderHistory() {
      return Object.values(this.orderList).filter(
        (history) =>
          history.date > this.dateRanges.firstDay &&
          history.date < this.dateRanges.lastDay
      );
    },
    totalTax() {
      if (this.totalProfit > 0)
        return parseFloat(this.totalProfit * 0.325).toFixed(3);
      else return 0;
    },
    totalBrokerageFee() {
      let totalBrokerageFee = 0;
      for (let i = 0; i < this.orderHistory.length; i++) {
        totalBrokerageFee += parseFloat(this.orderHistory[i].brokerageFee);
      }
      return parseFloat(totalBrokerageFee).toFixed(3);
    },
    totalBuy() {
      let totalBuy = 0;
      for (let i = 0; i < this.orderHistory.length; i++) {
        if (this.orderHistory[i].type == "buy") {
          totalBuy += parseFloat(
            this.orderHistory[i].price * this.orderHistory[i].quantity
          );
        }
      }
      return totalBuy.toFixed(3);
    },
    totalSell() {
      let totalSell = 0;
      for (let i = 0; i < this.orderHistory.length; i++) {
        if (this.orderHistory[i].type == "sell") {
          totalSell += parseFloat(
            this.orderHistory[i].price * this.orderHistory[i].quantity
          );
        }
      }
      return totalSell.toFixed(3);
    },
    totalProfit() {
      return parseFloat(
        this.totalSell - this.totalBuy - this.totalBrokerageFee
      ).toFixed(3);
    },
    totalProfitAfterTax() {
      return parseFloat(this.totalProfit - this.totalTax).toFixed(3);
    },
  },
  props: ["dateRanges", "type"],
};
</script>

<style lang="scss" scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
