<template>
  <div>
    <v-tabs fixed-tabs dark>
      <v-tab @click="type = 'buy'">Buy</v-tab>
      <v-tab @click="type = 'sell'">Sell</v-tab>
    </v-tabs>
    <AddBuy v-bind:type="type" />
  </div>
</template>

<script>
import AddBuy from "@/components/AddBuy";
import { db } from "@/firebase";

export default {
  data() {
    return {
      type: "buy"
    };
  },
  created() {
    this.$store.commit("clearAll");
    db.ref("ShareList")
      .orderByChild("owner")
      .equalTo(this.$store.state.user)
      .once("value", snapshot => {
        snapshot.forEach(child => {
          this.$store.commit("addShareList", {
            key: child.key,
            ...child.val()
          });
        });
      });
    db.ref("holdings")
      .orderByChild("owner")
      .equalTo(this.$store.state.user)
      .on("value", snapshot => {
        snapshot.forEach(child => {
          this.$store.commit("addHoldings", {
            key: child.key,
            ...child.val()
          });
        });
      });
  },
  components: {
    AddBuy
  }
};
</script>

<style lang="scss" scoped></style>
