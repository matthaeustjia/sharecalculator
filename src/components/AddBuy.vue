<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        v-model="shareName"
        :items="shareList"
        label="Share Name"
        item-text="shareName"
        required
      ></v-select>

      <v-text-field
        v-model="price"
        label="Price"
        required
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="quantity"
        label="Quantity"
        required
        type="number"
        min="1"
        step="1"
      ></v-text-field>

      <v-btn
        @click="addBuyToDatabase()"
        color="success"
        :disabled="!isValid"
        class="mr-4"
      >
        Add</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      shareName: "",
      shareList: [],
      price: "",
      quantity: "",
      type: "buy",
      date: Date.now(),
    };
  },
  created() {
    db.ref("ShareList").once("value", (snapshot) => {
      this.shareList = Object.values(snapshot.val());
    });
  },
  methods: {
    addBuyToDatabase() {
      db.ref("invoice").push({
        shareName: this.shareName,
        price: this.price,
        type: this.type,
        quantity: this.quantity,
        date: this.date,
      });
      (this.price = ""), (this.quantity = "");
    },
  },
  computed: {
    isValid() {
      if (this.shareName && this.price && this.quantity) return true;
      else return false;
    },
    total() {
      return this.price * this.quantity;
    },
  },
};
</script>

<style lang="scss" scoped></style>
