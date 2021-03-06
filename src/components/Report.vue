<template>
  <div>
    <MainBox>
      <v-card-title class="capitalize">
        {{ type }} report
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-subtitle>
        {{ new Date(dateRanges.firstDay).toLocaleDateString() }} -
        {{ new Date(dateRanges.lastDay).toLocaleDateString() }}</v-card-subtitle
      >
      <v-card-subtitle :class="totalProfit > 0 ? 'text-green' : 'text-red'">
        Profit ${{ totalProfit.toLocaleString() }}
      </v-card-subtitle>
      <v-card-subtitle :class="totalDividend > 0 ? 'text-green' : ''">
        Dividend ${{ totalDividend.toLocaleString() }}
      </v-card-subtitle>
      <v-card-subtitle class="text-red">
        Fees ${{ totalBrokerageFee.toLocaleString() }}
      </v-card-subtitle>
      <v-card-subtitle>
        <v-select
          :loading="loading"
          v-model="search"
          append-icon="search"
          :items="shareList"
          label="Search"
          item-text="shareName"
          single-lane
        ></v-select>
        <v-btn class="warning" block @click="clearSearch">Clear</v-btn>
      </v-card-subtitle>
    </MainBox>
    <v-card>
      <v-data-table
        class="data-table"
        mobile-breakpoint="0"
        items-per-page="5"
        :headers="headers"
        :items="orderHistory"
        :search="search"
        ><template v-slot:item.shareName="{ item }">
          <v-chip :color="getColor(item.type)" dark>{{
            item.shareName.toUpperCase()
          }}</v-chip>
        </template>
        <template v-slot:item.date="{ item }">
          {{ new Date(item.date).toLocaleDateString() }}
        </template>
        <template v-slot:item.total="{ item }">
          ${{ totalValue(item) }}
        </template></v-data-table
      >
    </v-card>
  </div>
</template>

<script>
import MainBox from "@/components/MainBox";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "shareName"
        },
        { text: "Price", value: "price" },
        { text: "Quantity", value: "quantity" },
        { text: "Total", value: "total" },
        { text: "Brokerage", value: "brokerageFee" },
        { text: "Date", value: "date" }
      ]
    };
  },
  methods: {
    clearSearch() {
      console.log(this.dateRanges);
      this.search = "";
    },
    getColor(type) {
      if (type == "sell") return "red";
      else return "green";
    },
    totalValue(share) {
      return parseFloat(parseFloat(share.quantity * share.price).toFixed(3));
    },
    typeBackground(item) {
      return item.type == "buy" ? "text-green" : "text-red";
    }
  },
  computed: {
    loading() {
      if (this.orderList) return false;
      else return true;
    },
    shareList() {
      return this.$store.state.shareList;
    },
    orderList() {
      return this.$store.getters.isSold;
    },
    orderHistory() {
      if (!this.search) {
        return Object.values(this.orderList)
          .filter(
            history =>
              history.date > this.dateRanges.firstDay &&
              history.date < this.dateRanges.lastDay
          )
          .slice()
          .reverse();
      } else {
        return Object.values(this.orderList)
          .filter(
            history =>
              history.shareName === this.search &&
              history.date > this.dateRanges.firstDay &&
              history.date < this.dateRanges.lastDay
          )
          .slice()
          .reverse();
      }
    },
    totalTax() {
      if (this.totalProfit > 0)
        return parseFloat(parseFloat(this.totalProfit * 0.325).toFixed(3));
      else return 0;
    },
    totalBrokerageFee() {
      let totalBrokerageFee = 0;
      for (let i = 0; i < this.orderHistory.length; i++) {
        totalBrokerageFee += parseFloat(this.orderHistory[i].brokerageFee);
      }
      return parseFloat(parseFloat(totalBrokerageFee).toFixed(3));
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
      return parseFloat(totalBuy.toFixed(3));
    },
    totalDividend() {
      let totalDividend = 0;
      for (let i = 0; i < this.orderHistory.length; i++) {
        if (this.orderHistory[i].type == "dividend") {
          totalDividend += parseFloat(
            this.orderHistory[i].price * this.orderHistory[i].quantity
          );
        }
      }
      return parseFloat(totalDividend.toFixed(3));
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
      return parseFloat(totalSell.toFixed(3));
    },
    totalProfit() {
      return parseFloat(
        parseFloat(
          this.totalDividend +
            this.totalSell -
            this.totalBuy -
            this.totalBrokerageFee
        ).toFixed(3)
      );
    },
    totalProfitAfterTax() {
      return parseFloat(
        parseFloat(this.totalProfit - this.totalTax).toFixed(3)
      );
    }
  },
  props: ["dateRanges", "type"],
  components: {
    MainBox
  }
};
</script>

<style lang="scss" scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
