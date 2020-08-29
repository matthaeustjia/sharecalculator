<template>
  <div>
    <v-select
      v-model="shareName"
      :items="shareList"
      label="Share Name"
      item-text="shareName"
      required
    ></v-select>
    <v-dialog
      ref="startDialog"
      v-model="startDateModal"
      :return-value.sync="startDate"
      persistent
      lazy
      full-width
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="startDate"
          label="Select startDate"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="startDate" scrollable>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$refs.startDialog.save(startDate)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      ref="endDialog"
      v-model="endDateModal"
      :return-value.sync="endDate"
      persistent
      lazy
      full-width
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="endDate"
          label="Select endDate"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="endDate" scrollable>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$refs.endDialog.save(endDate)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            block
            @click="getOrders"
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
          >
            View
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark>
            <v-btn block dark text @click="dialog = false">Close</v-btn>
          </v-toolbar>
          <v-list rounded three-line subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  :class="totalProfit > 0 ? 'bg-green' : 'bg-red'"
                  >Total Profit
                  {{
                    totalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}</v-list-item-title
                >
                <v-list-item-subtitle
                  >Total Buy
                  {{
                    totalBuy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}</v-list-item-subtitle
                ><v-list-item-subtitle
                  >Total Sell
                  {{
                    totalSell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle
                  ><v-simple-table dense>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Name</th>
                          <th class="text-left">Price</th>
                          <th class="text-left">Quantity</th>
                          <th class="text-left">Total</th>
                          <th class="text-left">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="history in orderHistory.slice().reverse()"
                          :key="history.name"
                        >
                          <td
                            :class="
                              history.type == 'buy' ? 'bg-green' : 'bg-red'
                            "
                          >
                            {{ history.shareName }}
                          </td>
                          <td>${{ history.price }}</td>
                          <td>{{ history.quantity }}</td>
                          <td>
                            ${{
                              (history.price * history.quantity)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            }}
                          </td>
                          <td>
                            {{
                              new Date(history.date).toLocaleDateString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              })
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table></v-list-item-subtitle
                >
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
      startDateModal: false,
      endDateModal: false,
      shareName: "",
      orderList: [],
      shareList: [],
      orderHistory: [],
    };
  },
  computed: {
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
      return this.totalSell - this.totalBuy;
    },
  },
  methods: {
    getOrders() {
      console.log(this.startDate);
      if (!this.shareName) {
        this.orderHistory = this.orderList;
      } else if (!this.startDate && !this.endDate) {
        this.orderHistory = this.orderList.filter(
          (history) => history.shareName === this.shareName
        );
      } else {
        var startDate = new Date(this.startDate).setHours(0, 0, 0, 0);

        var endDate = new Date(this.endDate).setHours(23, 59, 59, 999);

        this.orderHistory = this.orderList.filter(
          (history) =>
            history.shareName === this.shareName &&
            history.date > startDate &&
            history.date < endDate
        );
      }
    },
  },
  created() {
    db.ref("invoice")
      .orderByChild("owner")
      .equalTo(this.$store.state.user)
      .once("value", (snapshot) => {
        this.orderList = Object.values(snapshot.val());
      });
    db.ref("ShareList").once("value", (snapshot) => {
      this.shareList = Object.values(snapshot.val());
    });
  },
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
