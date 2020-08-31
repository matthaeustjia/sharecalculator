<template>
  <div>
    <v-main>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title class="capitalised">
                  {{
                  type
                  }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit.prevent="addToDatabase()">
                  <v-select
                    v-model="shareName"
                    :items="shareList"
                    label="Share Name"
                    item-text="shareName"
                    required
                  ></v-select>

                  <v-text-field
                    v-model="quantity"
                    label="Quantity"
                    required
                    type="number"
                    min="1"
                    step="1"
                  ></v-text-field>

                  <v-text-field v-model="price" label="Price" required type="number"></v-text-field>

                  <v-select
                    v-model="broker"
                    label="Broker"
                    :items="brokerList"
                    item-text="shareName"
                    required
                  ></v-select>
                  <v-btn type="subit" color="success" :disabled="!isValid" class="mr-4">{{ type }}</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      brokerList: ["SelfWealth", "Commsec"],
      holdings: this.$store.state.holdings,
      shareName: "",
      shareList: this.$store.state.shareList,
      price: "",
      quantity: "",
      broker: "SelfWealth",
      date: Date.now()
    };
  },
  methods: {
    calculateHoldings() {
      let currentHolding = this.shareName + this.$store.state.user;
      if (!this.holdings[currentHolding]) {
        db.ref("holdings")
          .child(this.shareName + this.$store.state.user)
          .set({
            shareName: this.shareName,
            quantity: parseInt(this.quantity),
            owner: this.$store.state.user
          });
      } else {
        let currentHoldingQuantity = this.holdings[currentHolding].quantity;
        if (this.type == "buy") {
          db.ref("holdings")
            .child(this.shareName + this.$store.state.user)
            .set({
              shareName: this.shareName,
              quantity:
                parseInt(currentHoldingQuantity) + parseInt(this.quantity),
              owner: this.$store.state.user
            });
        } else {
          db.ref("holdings")
            .child(this.shareName + this.$store.state.user)
            .set({
              shareName: this.shareName,
              quantity:
                parseInt(currentHoldingQuantity) - parseInt(this.quantity),
              owner: this.$store.state.user
            });
        }
      }
    },
    addToDatabase() {
      this.calculateHoldings();
      let brokerageFee;
      if (this.broker == "SelfWealth") {
        brokerageFee = 9.5;
      } else {
        if (this.total <= 1000) {
          brokerageFee = 10;
        } else if (this.total > 1000 && this.total <= 10000) {
          brokerageFee = 19.95;
        } else if (this.total > 10000 && this.total <= 25000) {
          brokerageFee = 29.95;
        } else {
          brokerageFee = this.total * 0.0012;
        }
      }
      db.ref("invoice").push({
        shareName: this.shareName,
        price: this.price,
        type: this.type,
        quantity: this.quantity,
        brokerageFee: brokerageFee.toFixed(2),
        date: this.date,
        owner: this.$store.state.user
      });
      this.price = "";
      this.quantity = "";
      setTimeout(() => this.$router.push("/recent"), 1000);
      this.$parent.initializeData();
    }
  },
  props: ["type"],
  computed: {
    isValid() {
      if (this.shareName && this.price && this.quantity) return true;
      else return false;
    },
    total() {
      return this.price * this.quantity;
    }
  }
};
</script>

<style lang="scss" scoped>
.capitalised {
  text-transform: capitalize;
}
</style>
