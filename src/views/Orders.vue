<template>
  <div>
    <v-select
      @change="getOrders()"
      v-model="shareName"
      :items="shareList"
      label="Share Name"
      item-text="shareName"
      required
    ></v-select>
    <v-simple-table dense>
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
          <tr v-for="history in orderHistory" :key="history.name">
            <td
              :class="[
                history.type == 'buy' ? 'background-color:red' : '',
                'background-color:green',
              ]"
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
    </v-simple-table>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      shareName: "",
      orderList: [],
      shareList: [],
      orderHistory: [],
    };
  },
  methods: {
    getOrders() {
      this.orderHistory = this.orderList.filter(
        (history) => history.shareName === this.shareName
      );
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

<style lang="scss" scoped></style>
