<template>
  <div>
    <v-text-field
      v-model="shareName"
      label="Share Name"
      required
      type="text"
    ></v-text-field>
    <v-btn
      @click="addStock()"
      color="success"
      :disabled="!isValid"
      class="mr-4"
    >
      Add</v-btn
    >
  </div>
</template>

<script>
import { db } from "@/firebase";
export default {
  data() {
    return {
      shareName: "",
    };
  },
  computed: {
    isValid() {
      if (this.shareName) {
        return true;
      }
      return false;
    },
  },
  methods: {
    addStock() {
      db.ref("ShareList").push({
        shareName: this.shareName.toUpperCase(),
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
