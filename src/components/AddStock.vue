<template>
  <div>
    <v-text-field
      v-model="shareName"
      label="Share Name"
      required
      type="text"
    ></v-text-field>
    <v-btn @click="addStock()" color="success" :disabled="!isValid" class="mr-4"
      >Add</v-btn
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
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate() - 1;
      var lastUpdated = new Date(y, m, d).setHours(17, 0, 0, 0);
      db.ref("ShareList").push({
        shareName: this.shareName.toUpperCase(),
        owner: this.$store.state.user,
      });
      db.ref("sharePrice")
        .child(this.shareName)
        .set({
          shareName: this.shareName,
          lastUpdated: lastUpdated,
        });
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.uppercase {
  text-transform: uppercase;
}
</style>
