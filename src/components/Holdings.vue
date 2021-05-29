<template>
  <div class="invest-box">
    <div class="invest-header">
      <span> Account Balance </span>
      <div>${{ getTotalValue }}</div>
    </div>
    <div class="invest-sub">
      Total Spent
      <div>${{ getTotalSpent }}</div>
    </div>

    <div class="invest-sub">
      Total Difference
      <div :class="getTotalDifference > 0 ? 'bg-green' : 'bg-red'">
        ${{ getTotalDifference }}
      </div>
    </div>

    <div class="invest-button">
      <v-tabs>
        <v-tab>Value</v-tab>
        <v-tab>Diversiciation</v-tab>
      </v-tabs>
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
       options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, -25, 50, 49, 60, 70, 91]
      }]
    };
  },
  computed:{
    groups(){
      return this.$store.getters.groups
    },
    orderList() {
      return this.$store.state.orderList;
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
      return totalDifference.toLocaleString();
    },getTotalValue(){
      let totalValue = 0;
      Object.keys(this.groups).forEach(holding => {
        totalValue += parseFloat(this.getCurrentValue(holding))
      });
      return totalValue.toLocaleString();
    },getTotalSpent(){
      let totalValue = 0;
      Object.keys(this.groups).forEach(holding => {
        totalValue += parseFloat(this.getTotalPaid(holding))
      });
      return totalValue.toLocaleString();
    }
  }
};
</script>

<style lang="scss" scoped>
.invest-box {
  padding: 1rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: darkgray;
  border-radius: 0.2rem;
}

.invest-header {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.invest-sub {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.invest-button {
  background-color: transparent;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
}
</style>
