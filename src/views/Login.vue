<template>
  <div>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="signIn">
          <v-text-field
            prepend-icon="person"
            v-model="user"
            label="Login"
            type="text"
          ></v-text-field>
          <v-text-field
            prepend-icon="lock"
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <v-container>
      <v-form>
        <v-container class="v-flex">
          <v-row
            ><v-select
              v-model="broker"
              label="Broker"
              :items="brokerList"
              item-text="shareName"
              required
            ></v-select
          ></v-row>
          <v-row>
            <v-text-field
              v-model="quantity"
              label="Quantity"
              required
              type="number"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="buyPrice"
              label="Buying Price"
              required
              type="number"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="sellPrice"
              label="Selling Price"
              required
              type="number"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              readonly
              v-model="brokerFee"
              label="BrokerageFee"
              required
              type="number"
            ></v-text-field>
          </v-row>
        </v-container>
      </v-form>
      <v-alert v-if="totalProfit > 0" color="success">
        Profit ${{ totalProfit }}
      </v-alert>
      <v-alert v-else color="error"> ${{ totalProfit }} </v-alert></v-container
    >
  </div>
</template>

<script>
import { auth } from "@/firebase";
export default {
  data() {
    return {
      user: "",
      password: "",
      brokerList: ["SelfWealth", "Commsec"],
      quantity: 0,
      buyPrice: 0,
      sellPrice: 0,
      broker: "SelfWealth",
    };
  },
  computed: {
    total() {
      return this.quantity * this.sellPrice;
    },
    totalProfit() {
      return parseFloat(
        (this.sellPrice - this.buyPrice) * this.quantity - this.brokerFee
      ).toFixed(3);
    },
    brokerFee() {
      if (this.broker == "SelfWealth") {
        return 9.5 * 2;
      } else {
        if (this.total <= 1000) {
          return 10 * 2;
        } else if (this.total > 1000 && this.total <= 10000) {
          return 19.95 * 2;
        } else if (this.total > 10000 && this.total <= 25000) {
          return 29.95 * 2;
        } else {
          return this.total * 0.0012 * 2;
        }
      }
    },
  },
  methods: {
    signIn() {
      let user = this.user + "@share.com";
      auth
        .signInWithEmailAndPassword(user, this.password)
        .then(() => {
          this.$store.commit("setUser", this.user), this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
