<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-container>
          <v-btn
            class="capitalised"
            block
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Add Dividend
          </v-btn>
        </v-container>
      </template>
      <v-card class="elevation-12">
        <v-toolbar>
          <v-card-title>
            <span class="capitalised">Add Dividend</span>
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
              label="Dividend per share"
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
                >Add Dividend</v-btn
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
      shareName: "",
      price: "",
      quantity: "",
      date: Date.now(),
      dialog: false,
    };
  },
  methods: {
    addToDatabase() {
      db.ref("dividends").push({
        shareName: this.shareName,
        price: this.price,
        quantity: this.quantity,
        date: this.date,
        owner: this.$store.state.user,
      });
      setTimeout(() => this.$router.push("/"), 1000);
    },
  },
  computed: {
    totalValue() {
      return parseFloat(this.quantity * this.price);
    },
    shareList() {
      return this.$store.state.shareList;
    },
    groups() {
      return this.$store.getters.groups;
    },
    isValid() {
      if (!this.shareName || !this.price || !this.quantity) return false;
      else return true;
    },
    total() {
      return this.price * this.quantity;
    },
  },
};
</script>

<style lang="scss" scoped>
.capitalised {
  text-transform: capitalize;
}
</style>
