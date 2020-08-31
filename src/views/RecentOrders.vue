<template>
  <div>
    <v-tabs fixed-tabs dark>
      <v-tab @click="type = 'monthly'">Monthly</v-tab>
      <v-tab @click="type = 'yearly'">Yearly</v-tab>
      <v-tab @click="type = 'all'">All</v-tab>
    </v-tabs>
    <MonthlyReport v-if="type == 'monthly'" />
    <YearlyReport v-if="type == 'yearly'" />
    <AllReport v-if="type == 'all'" />
  </div>
</template>

<script>
import MonthlyReport from "@/components/MonthlyReport";
import YearlyReport from "@/components/YearlyReport";
import AllReport from "@/components/AllReport";

export default {
  data() {
    return {
      type: "monthly"
    };
  },
  components: { MonthlyReport, YearlyReport, AllReport }
};
</script>

<style lang="scss" scoped></style>
