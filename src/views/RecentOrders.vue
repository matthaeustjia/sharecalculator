<template>
  <div>
    <v-tabs fixed-tabs dark>
      <v-tab @click="type = 'monthly'">Monthly</v-tab>
      <v-tab @click="type = 'yearly'">Yearly</v-tab>
      <v-tab @click="type = 'all'">All</v-tab>
      <v-tab @click="type = 'holdings'">Holdings</v-tab>
    </v-tabs>
    <Holdings v-if="type == 'holdings'" />
    <MonthlyReport v-if="type == 'monthly'" />
    <YearlyReport v-if="type == 'yearly'" />
    <AllReport v-if="type == 'all'" />
  </div>
</template>

<script>
import MonthlyReport from "@/components/MonthlyReport";
import Holdings from "@/components/Holdings";
import YearlyReport from "@/components/YearlyReport";
import AllReport from "@/components/AllReport";
import axios from "axios";
import { db } from "@/firebase";

export default {
  data() {
    return {
      type: "monthly",
      sharePrice: this.$store.state.sharePrice
    };
  },
  created() {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();
    var nextUpdate = new Date(y, m, d+1).setHours(17, 0, 0, 0);
    var shouldUpdate = new Date().getTime();
    this.sharePrice.forEach(function(share) {

      if(share.nextUpdate < shouldUpdate){
    console.log("updated")
        var shareUrl =
        "http://api.marketstack.com/v1/eod/latest?access_key=172a0cab85d8eb88f6d03c471078a515&symbols=" +
        share.key +
        ".XASX&fbclid=IwAR2QlXIujN1jbxYHqoM-w-YkpO2WcPxjmbtwRpin8N7GYKdAFzp9LWsiYtc";
      axios.get(shareUrl).then(function(res) {
        db.ref("sharePrice")
          .child(share.key)
          .set({
            shareName: share.key,
            price: res.data.data.[0].close,
            nextUpdate: nextUpdate
          });
      });}
      else{
          console.log("didnt update")
      }
    });
  },
  components: { MonthlyReport, YearlyReport, AllReport, Holdings }
};
</script>

<style lang="scss" scoped></style>
