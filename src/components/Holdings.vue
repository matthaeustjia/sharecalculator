<template>
  <div>
    Holding
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Price</th>
            <th class="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="holding in holdings" :key="holding.shareName">
            <td>{{ holding.shareName }}</td>
            <td>{{ holding.quantity }}</td>
            <td>150</td>
            <td>150</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      holdings: this.$store.state.holdings
    };
  }
};
</script>

<style lang="scss" scoped></style>
