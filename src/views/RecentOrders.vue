<template>
  <div>
    <v-list-item-content>
      <v-list-item-title>Monthly Report</v-list-item-title>
      <v-divider></v-divider>
      <v-list-item-title :class="totalProfit > 0 ? 'bg-green' : 'bg-red'">
        Profit ${{
        totalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </v-list-item-title>
      <v-list-item-title :class="totalProfit > 0 ? 'bg-green' : 'bg-red'">
        NPAT ${{
        totalProfitAfterTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </v-list-item-title>
      <v-list-item-subtitle>
        Buy ${{
        totalBuy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        Sell ${{
        totalSell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </v-list-item-subtitle>
      <v-list-item-subtitle class="bg-red">
        Fee ${{
        totalBrokerageFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </v-list-item-subtitle>
      <v-list-item-subtitle class="bg-red">
        Tax ${{
        totalTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </v-list-item-subtitle>
    </v-list-item-content>Holding
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
          <tr v-for="holding in holdings" :key="holding.shareName">
            <td>{{ holding.shareName }}</td>
            <td>{{ holding.quantity }}</td>
            <td>150</td>
            <td>150</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
          <tr v-for="history in orderHistory.slice().reverse()" :key="history.name">
            <td :class="history.type == 'buy' ? 'bg-green' : 'bg-red'">{{ history.shareName }}</td>
            <td>${{ history.price }}</td>
            <td>{{ history.quantity }}</td>
            <td>
              ${{
              (history.price * history.quantity)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }}
            </td>
            <td>{{ history.brokerageFee }}</td>

            <td>
              {{
              new Date(history.date).toLocaleDateString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
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
import { db } from "@/firebase";

export default {
  data() {
    return {
      orderList: [],
      holdings: this.$store.state.holdings
    };
  },
  created() {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1).setHours(0, 0, 0, 0);
    var lastDay = new Date(y, m + 1, 0).setHours(23, 59, 59, 999);
    db.ref("invoice")
      .orderByChild("date")
      .startAt(firstDay)
      .endAt(lastDay)
      .once("value", snapshot => {
        this.orderList = Object.values(snapshot.val());
      });
  },
  computed: {
    orderHistory() {
      return this.orderList.filter(
        history => history.owner === this.$store.state.user
      );
    },
    totalTax() {
      if (this.totalProfit > 0)
        return parseFloat(this.totalProfit * 0.325).toFixed(2);
      else return 0;
    },
    totalBrokerageFee() {
      let totalBrokerageFee = 0;
      for (let i = 0; i < this.orderHistory.length; i++) {
        totalBrokerageFee += parseFloat(this.orderHistory[i].brokerageFee);
      }
      return parseFloat(totalBrokerageFee).toFixed(2);
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
      return this.totalSell - this.totalBuy - this.totalBrokerageFee;
    },
    totalProfitAfterTax() {
      return parseFloat(this.totalProfit - this.totalTax).toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-red {
  background-color: red;
}
.bg-green {
  background-color: green;
}
</style>
