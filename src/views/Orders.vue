<template>
  <div>
    <v-select
      @change="getOrders(shareName)"
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
            <th></th>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Total</th>
            <th class="text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="history in orderHistory" :key="history.name">
            <v-icon v-if="history.type == 'buy'" color="green"
              >mdi-heart</v-icon
            >
            <v-icon v-if="history.type == 'sell'" color="red">mdi-heart</v-icon>

            <td>{{ history.shareName }}</td>
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
      orderHistory: [],
      shareList: [],
    };
  },
  methods: {
    getOrders(shareName) {
      db.ref("invoice")
        .orderByChild("shareName")
        .equalTo(shareName)
        .once("value", (snapshot) => {
          this.orderHistory = Object.values(snapshot.val());
        });
    },
  },
  created() {
    db.ref("ShareList").once("value", (snapshot) => {
      this.shareList = Object.values(snapshot.val());
    });
  },
};
</script>

<style lang="scss" scoped></style>
