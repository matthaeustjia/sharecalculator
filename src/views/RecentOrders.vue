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

export default {
  data() {
    return {
      type: "monthly"
    };
  },
  components: { MonthlyReport, YearlyReport, AllReport, Holdings }
};
</script>

<style lang="scss" scoped></style>
