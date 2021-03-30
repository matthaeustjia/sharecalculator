<template>
  <div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Average</th>
            <th class="text-left">Difference(%)</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Latest</th>
            <th class="text-left">Total Paid</th>
            <th class="text-left">Current Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(key, value) in groups" :key="value">
            <td>{{ value }}</td>
            <td>${{ getAveragePrice(value) }}</td>
            <td :class="getDifference(value) > 0 ? 'bg-green' : 'bg-red'">
              ${{ getDifference(value) }} (%{{
                getDifferencePercentage(value)
              }})
            </td>
            <td>{{ getTotalQuantity(value) }}</td>
            <td>${{ getSharePrice(value) }}</td>
            <td>${{ getTotalPaid(value) }}</td>
            <td>${{ getCurrentValue(value) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    Total Spent
    <div>${{ getTotalSpent }}</div>
    Holdings
    <div>${{ getTotalValue }}</div>
    Total Difference
    <div :class="getTotalDifference > 0 ? 'bg-green' : 'bg-red'">
      ${{ getTotalDifference }}
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getDifference(shareName){
      return parseFloat(parseFloat(this.getCurrentValue(shareName)-this.getTotalPaid (shareName)).toFixed(2));
    },
    getDifferencePercentage(shareName){
      return parseFloat(parseFloat(this.getSharePrice(shareName)-this.getAveragePrice(shareName)).toFixed(2)/this.getAveragePrice(shareName)*100).toFixed(2);
    },
    getCurrentValue(shareName){
      return parseFloat(this.getSharePrice(shareName)*this.getTotalQuantity(shareName))
    },
    getSharePrice(shareName) {
      let getSharePriceByName = this.sharePrice.find(
        share => share.shareName == shareName
      );
      return getSharePriceByName.price;;
    },
    getAveragePrice(shareName){
      return parseFloat(parseFloat(this.getTotalPaid(shareName)/this.getTotalQuantity(shareName)).toFixed(2));
    },
    getTotalPaid(shareName) {
      let totalValue = 0;
      for (let i = 0; i < this.groups[shareName].length; i++) {
        if(this.groups.[shareName][i].type == 'buy') totalValue += parseFloat(this.groups.[shareName][i].price*this.groups.[shareName][i].quantity);
        else totalValue -= parseFloat(this.groups.[shareName][i].price*this.groups.[shareName][i].quantity)

      }
      return parseFloat(parseFloat(totalValue).toFixed(2));
    },
    getTotalQuantity(shareName) {
      let quantity = 0;
      for (let i = 0; i < this.groups[shareName].length; i++) {
        if(this.groups.[shareName][i].type == 'buy') quantity += parseInt(this.groups.[shareName][i].quantity);
      else quantity -= parseInt(this.groups.[shareName][i].quantity);
      }
      return quantity
    },
  },
  data() {
    return {
      price: "",
    };
  },
  computed:{
    groups(){
      return this.$store.getters.groups
    },
    sharePrice(){
      return this.$store.state.sharePrice
    },
    holdings(){
      return this.$store.getters.isNotSold
    },
    getTotalDifference(){
      let totalDifference = 0;
      Object.keys(this.groups).forEach(holding => {
        totalDifference += parseFloat(this.getDifference(holding))
      });
      return totalDifference.toFixed(2);
    },getTotalValue(){
      let totalValue = 0;
      Object.keys(this.groups).forEach(holding => {
        totalValue += parseFloat(this.getCurrentValue(holding))
      });
      return totalValue.toFixed(2);
    },getTotalSpent(){
      let totalValue = 0;
      Object.keys(this.groups).forEach(holding => {
        totalValue += parseFloat(this.getTotalPaid(holding))
      });
      return totalValue.toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped></style>
