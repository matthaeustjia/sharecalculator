<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-container>
          <v-btn
            class="capitalised"
            @click="type = 'buy'"
            block
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Buy Stock </v-btn
          ><v-btn
            class="capitalised"
            @click="type = 'sell'"
            block
            color="error"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Sell Stock
          </v-btn>
        </v-container>
      </template>
      <v-card class="elevation-12">
        <v-toolbar>
          <v-card-title>
            <span class="headline">{{ type }}</span>
          </v-card-title>
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
              pattern="[0-9]{10}"
            ></v-text-field>
            <span v-if="type == 'sell' && shareName">
              Available to sell: {{ this.ownedShare }} units
            </span>
            <v-text-field
              v-model="price"
              label="Price"
              required
              type="number"
            ></v-text-field>

            <v-text-field
              v-if="isValid"
              v-model="totalValue"
              label="Total Value"
              readonly
              type="number"
            ></v-text-field>

            <v-select
              v-model="broker"
              label="Broker"
              :items="brokerList"
              item-text="shareName"
              required
            ></v-select>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click="dialog = false" color="error" class="mr-4"
                >Close</v-btn
              >
              <v-btn
                large
                type="submit"
                color="success"
                :disabled="!isValid"
                class="mr-4"
                >{{ type }}</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      brokerList: ["SelfWealth", "Commsec"],
      shareName: "",
      price: "",
      quantity: "",
      broker: "SelfWealth",
      date: Date.now(),
      dialog: false,
      type: "buy"
    };
  },
  methods: {
    addToDatabase() {
      let brokerageFee;
      let isSold = false;
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
      if(this.type == "sell"){
        if(this.quantity - this.ownedShare == 0 ){
        isSold = true;
        for (let i=0; i<this.groups[this.shareName].length; i++){
          db.ref("invoice").child(this.groups[this.shareName][i].key).update({"date": this.date, "isSold" : true})
        }}

      }
      db.ref("invoice").push({
        shareName: this.shareName,
        price: this.price,
        type: this.type,
        quantity: this.quantity,
        brokerageFee: brokerageFee.toFixed(2),
        date: this.date,
        isSold: isSold,
        owner: this.$store.state.user,
      });
      this.price = "";
      this.quantity = "";
      setTimeout(() => this.$router.push("/"), 1000);
    },
  },
  computed: {
    totalValue(){
      return parseFloat(this.quantity * this.price);
    },
    shareList(){
      return  this.$store.state.shareList
    },
    groups() {
      return this.$store.getters.groups;
    },
    isValid() {
      if (!this.shareName || !this.price || !this.quantity) return false;
      if(this.type == 'sell' && this.quantity > this.ownedShare) return false;
      else return true;
    },
    total() {
      return this.price * this.quantity;
    },
    ownedShare() {
      let quantity = 0;
      if (this.groups[this.shareName]) {
        for (let i = 0; i < this.groups[this.shareName].length; i++)
        {
        if(this.groups.[this.shareName][i].type == 'buy')  quantity += parseInt(this.groups.[this.shareName][i].quantity);
        else quantity -= parseInt(this.groups.[this.shareName][i].quantity)
        }
      }
      return quantity;
    },
  },
};
</script>

<style lang="scss" scoped>
.capitalised {
  text-transform: capitalize;
}
</style>
