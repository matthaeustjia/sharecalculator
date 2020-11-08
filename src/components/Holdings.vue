<template>
  <div>
    Holding
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Average</th>
            <th class="text-left">Latest</th>
            <th class="text-left">Total Paid</th>
            <th class="text-left">Current Value</th>
            <th class="text-left">Difference</th>
            <th class="text-left">%</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(key, value) in groups" :key="value">
            <td>{{ value }}</td>
            <td>{{ getTotalQuantity(value) }}</td>
            <td>${{ getAveragePrice(value) }}</td>
            <td>${{ getSharePrice(value) }}</td>
            <td>${{ getTotalPaid(value) }}</td>
            <td>${{ getCurrentValue(value) }}</td>
            <td :class="getDifference(value) > 0 ? 'bg-green' : 'bg-red'">
              ${{ getDifference(value) }}
            </td>
            <td :class="getDifference(value) > 0 ? 'bg-green' : 'bg-red'">
              %{{ getDifferencePercentage(value) }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    Total Difference
    <div :class="getTotalDifference > 0 ? 'bg-green' : 'bg-red'">
      ${{ getTotalDifference }}
    </div>
    Total Value
    <div>${{ getTotalValue }}</div>
  </div>
</template>

<script>
export default {
  methods: {
    getDifference(shareName){
      return parseFloat(parseFloat(this.getCurrentValue(shareName)-this.getTotalPaid (shareName)).toFixed(3));
    },
    getDifferencePercentage(shareName){
      return parseFloat(parseFloat(this.getAveragePrice(shareName)-this.getSharePrice(shareName)).toFixed(3)/this.getSharePrice(shareName)*100).toFixed(3);
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
      return parseFloat(parseFloat(this.getTotalPaid(shareName)/this.getTotalQuantity(shareName)).toFixed(3));
    },
    getTotalPaid(shareName) {
      let totalValue = 0;
      for (let i = 0; i < this.groups[shareName].length; i++) {
        if(this.groups.[shareName][i].type == 'buy') totalValue += parseFloat(this.groups.[shareName][i].price*this.groups.[shareName][i].quantity);
        else totalValue -= parseFloat(this.groups.[shareName][i].price*this.groups.[shareName][i].quantity)

      }
      return parseFloat(parseFloat(totalValue).toFixed(3));
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
      groups: this.$store.getters.groups,
      sharePrice: this.$store.state.sharePrice,
      holdings: this.$store.getters.isNotSold
    };
  },
  computed:{
    getTotalDifference(){
      let totalDifference = 0;
      Object.keys(this.groups).forEach(holding => {
        totalDifference += parseFloat(this.getDifference(holding))
      });
      return totalDifference.toFixed(3);
    },getTotalValue(){
      let totalValue = 0;
      Object.keys(this.groups).forEach(holding => {
        totalValue += parseFloat(this.getCurrentValue(holding))
      });
      return totalValue.toFixed(3);
    },
  }
};
</script>

<style lang="scss" scoped></style>
