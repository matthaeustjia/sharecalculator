<template>
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
          <td :class="history.type == 'buy' ? 'bg-green' : 'bg-red'">
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
</template>

<script>
import { db } from "@/firebase";
export default {
  data() {
    return {
      orderHistory: [],
    };
  },
  created() {
    db.ref("invoice")
      .orderByChild("owner")
      .equalTo(this.$store.state.user)
      .limitToLast(10)
      .once("value", (snapshot) => {
        this.orderHistory = Object.values(snapshot.val());
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
