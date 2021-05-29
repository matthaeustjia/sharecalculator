<template>
  <div>
    <v-container class="d-flex flex-column justify-center" v-if="!dialog">
      <div><Holdings /></div>
      <div class="date-option">
        <v-btn class="date-option-button" @click="openDialog('daily')"
          >1D</v-btn
        >
        <v-btn class="date-option-button" @click="openDialog('weekly')"
          >1W</v-btn
        >
        <v-btn class="date-option-button" @click="openDialog('monthly')"
          >1M</v-btn
        >
        <v-btn class="date-option-button" @click="openDialog('yearly')"
          >1Y</v-btn
        >
        <v-btn class="date-option-button" @click="openDialog('all')">All</v-btn>
      </div>
    </v-container>
    <div v-else>
      <Holdings v-if="type == 'holdings'" />
      <Report v-else v-bind:type="type" v-bind:dateRanges="dateRanges" />
      <v-btn
        color="error"
        @click="closeDialog"
        block
        class="close-dialog-button"
        >Close</v-btn
      >
    </div>
  </div>
</template>

<script>
import Report from "@/components/Report";
import Holdings from "@/components/Holdings";
import axios from "axios";
import { db } from "@/firebase";

export default {
  data() {
    return {
      type: "",
      dialog: false,
      sharePrice: this.$store.state.sharePrice
    };
  },
  computed: {
    dateRanges() {
      let date = new Date();
      let firstDay;
      let lastDay;
      let y = date.getFullYear();
      let m = date.getMonth();
      let w = date.getDate() - date.getDay() + 1; // First day is the day of the month - the day of the week
      let d = date.getDate();
      if (this.type == "daily") {
        firstDay = new Date(date.setDate(d)).setHours(0, 0, 0, 0);
        lastDay = new Date(date.setDate(d)).setHours(23, 59, 59, 999);
      } else if (this.type == "weekly") {
        firstDay = new Date(date.setDate(w)).setHours(0, 0, 0, 0);
        lastDay = new Date(date.setDate(w + 6)).setHours(23, 59, 59, 999);
      } else if (this.type == "monthly") {
        firstDay = new Date(y, m, 1).setHours(0, 0, 0, 0);
        lastDay = new Date(y, m + 1, 0).setHours(23, 59, 59, 999);
      } else if (this.type == "yearly") {
        if (m < 7) {
          firstDay = new Date(y - 1, 6, 1).setHours(0, 0, 0, 0);
          lastDay = new Date(y, 5, 30).setHours(23, 59, 59, 999);
        } else {
          firstDay = new Date(y, 6, 1).setHours(0, 0, 0, 0);
          lastDay = new Date(y + 1, 5, 30).setHours(23, 59, 59, 999);
        }
      } else {
        firstDay = 0;
        lastDay = 9999999999999;
      }
      return { firstDay: firstDay, lastDay: lastDay };
    }
  },
  methods: {
    openDialog(type) {
      this.dialog = true;
      this.type = type;
    },
    closeDialog() {
      this.dialog = false;
    },
    initializeData() {
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
      db.ref("sharePrice").once("value", snapshot => {
        snapshot.forEach(child => {
          this.$store.commit("addSharePrice", {
            key: child.key,
            ...child.val()
          });
        });
      });
      db.ref("invoice")
        .orderByChild("owner")
        .equalTo(this.$store.state.user)
        .once("value", snapshot => {
          snapshot.forEach(child => {
            this.$store.commit("addOrderList", {
              key: child.key,
              ...child.val()
            });
          });
        });
    }
  },
  created() {
    this.initializeData();
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();
    var nextUpdate = new Date(y, m, d + 1).setHours(1, 0, 0, 0);
    var shouldUpdate = new Date().getTime();
    this.sharePrice.forEach(function(share) {
      if (share.nextUpdate < shouldUpdate) {
        var shareUrl =
          "http://api.marketstack.com/v1/eod/latest?access_key=172a0cab85d8eb88f6d03c471078a515&symbols=" +
          share.key +
          ".XASX&fbclid=IwAR2QlXIujN1jbxYHqoM-w-YkpO2WcPxjmbtwRpin8N7GYKdAFzp9LWsiYtc";
        axios.get(shareUrl).then(function(res) {
          db.ref("sharePrice")
            .child(share.key)
            .set({
              shareName: share.key,
              price: res.data.data[0].close,
              nextUpdate: nextUpdate
            });
        });
      } else {
        console.log("didnt update");
      }
    });
  },
  components: { Report, Holdings }
};
</script>

<style lang="scss" scoped>
.close-dialog-button {
  position: fixed;
  bottom: 3.5rem;
}
.date-option {
  display: flex;
  justify-content: center;
}

.date-option-button {
  margin-left: 0.15rem;
  margin-right: 0.15rem;
}
</style>
