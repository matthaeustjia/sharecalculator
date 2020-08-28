<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th></th>
          <th class="text-left">Date</th>
          <th class="text-left">Name</th>
          <th class="text-left">Price</th>
          <th class="text-left">Quantity</th>
          <th class="text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="history in orderHistory.slice().reverse()"
          :key="history.name"
        >
          <v-icon v-if="history.type == 'buy'" color="green">mdi-heart</v-icon>
          <v-icon v-if="history.type == 'sell'" color="red">mdi-heart</v-icon>
          <td>
            {{
              new Date(history.date).toLocaleDateString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            }}
          </td>
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

<style lang="scss" scoped></style>
