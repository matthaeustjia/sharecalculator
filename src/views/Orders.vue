<template>
  <div>
    <v-select
      v-model="shareName"
      :items="shareList"
      label="Share Name"
      item-text="shareName"
      required
    ></v-select>
    <v-dialog ref="startDialog" v-model="startDateModal" :return-value.sync="startDate" persistent>
      <template v-slot:activator="{ on }">
        <v-text-field v-model="startDate" label="Select startDate" readonly v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="startDate" scrollable>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$refs.startDialog.save(startDate)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog ref="endDialog" v-model="endDateModal" :return-value.sync="endDate" persistent>
      <template v-slot:activator="{ on }">
        <v-text-field v-model="endDate" label="Select endDate" readonly v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="endDate" scrollable>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$refs.endDialog.save(endDate)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-row justify="center">
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn block @click="getOrders" color="success" dark v-bind="attrs" v-on="on">View</v-btn>
        </template>
        <v-card>
          <v-toolbar dark>
            <v-btn block dark text @click="dialog = false">Close</v-btn>
          </v-toolbar>
          <v-list rounded three-line subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title :class="totalProfit > 0 ? 'bg-green' : 'bg-red'">
                  Profit ${{
                  totalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                </v-list-item-title>
                <v-list-item-title :class="totalProfit > 0 ? 'bg-green' : 'bg-red'">
                  NPAT ${{
                  totalProfitAfterTax
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                  totalBrokerageFee
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="bg-red">
                  Tax ${{
                  totalTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>
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
                          <td
                            :class="
                              history.type == 'buy' ? 'bg-green' : 'bg-red'
                            "
                          >{{ history.shareName }}</td>
                          <td>${{ history.price }}</td>
                          <td>{{ history.quantity }}</td>
                          <td>
                            ${{
                            (history.price * history.quantity)
                            .toFixed(3)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            }}
                          </td>
                          <td>${{ history.brokerageFee }}</td>
                          <td>
                            {{
                            new Date(history.date).toLocaleDateString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                            })
                            }}
                          </td>
                          <td class="text-right">
                            <v-btn @click="deleteOrder(history)" small color="error">Delete</v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      startDate: "",
      endDate: "",
      holdings: this.$store.state.holdings,
      startDateModal: false,
      endDateModal: false,
      shareName: "",
      orderList: this.$store.state.orderList,
      shareList: this.$store.state.shareList,
      orderHistory: []
    };
  },
  computed: {
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
      return this.totalSell - this.totalBuy - this.totalBrokerageFee;
    },
    totalProfitAfterTax() {
      return parseFloat(this.totalProfit - this.totalTax).toFixed(3);
    }
  },
  methods: {
    deleteOrder(history) {
      var currentHolding = history.shareName + this.$store.state.user;
      var currentHoldingQuantity = this.holdings[currentHolding].quantity;

      if (history.type == "buy") {
        db.ref("holdings")
          .child(history.shareName + this.$store.state.user)
          .set({
            shareName: history.shareName,
            quantity:
              parseInt(currentHoldingQuantity) - parseInt(history.quantity),
            owner: this.$store.state.user
          });
      } else {
        db.ref("holdings")
          .child(history.shareName + this.$store.state.user)
          .set({
            shareName: history.shareName,
            quantity:
              parseInt(currentHoldingQuantity) + parseInt(history.quantity),
            owner: this.$store.state.user
          });
      }

      db.ref("invoice")
        .child(history.key)
        .remove();
      this.$router.push("/");
    },
    getOrders() {
      var startDate;
      var endDate;
      if (this.startDate)
        startDate = new Date(this.startDate).setHours(0, 0, 0, 0);
      else startDate = new Date("2000-08-29").setHours(0, 0, 0, 0);

      if (this.endDate)
        endDate = new Date(this.endDate).setHours(23, 59, 59, 999);
      else endDate = new Date("2037-08-29").setHours(23, 59, 59, 999);

      if (!this.shareName) {
        this.orderHistory = Object.values(this.orderList).filter(
          history => history.date > startDate && history.date < endDate
        );
      } else {
        this.orderHistory = Object.values(this.orderList).filter(
          history =>
            history.shareName === this.shareName &&
            history.date > startDate &&
            history.date < endDate
        );
      }
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
