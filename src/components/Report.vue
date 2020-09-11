<template>
  <div>
    <v-list-item-content>
      <v-list-item-title class="capitalize"
        >{{ type }} report</v-list-item-title
      >
      <v-divider></v-divider>
      <v-list-item-title :class="totalProfit > 0 ? 'bg-green' : 'bg-red'">
        Profit ${{
          totalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </v-list-item-title>
      <v-list-item-subtitle>
        Buy ${{ totalBuy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        Sell ${{ totalSell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
      </v-list-item-subtitle>
      <v-list-item-subtitle class="bg-red">
        Fees ${{
          totalBrokerageFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Total</th>
            <th class="text-left">Broker Fee</th>
            <th class="text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="history in orderHistory.slice().reverse()"
            :key="history.name"
          >
            <td :class="history.type == 'buy' ? 'bg-green' : 'bg-red'">
              {{ history.shareName }}
            </td>
            <td>${{ history.price }}</td>
            <td>{{ history.quantity }}</td>
            <td>
              ${{
                (history.price * history.quantity)
                  .toFixed(3)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }}
            </td>
            <td>+${{ history.brokerageFee }}</td>

            <td>
              {{
                new Date(history.date).toLocaleDateString([], {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
              }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
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
      return totalBuy;
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
      return totalSell;
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