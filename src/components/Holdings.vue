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
            <th class="text-left">Total Paid</th>
            <th class="text-left">Difference</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(key, value) in groups" :key="value">
            <td>{{ value }}</td>
            <td>{{ getTotalQuantity(value) }}</td>
            <td>${{ getAveragePrice(value) }}</td>
            <td>${{ getTotalPaid(value) }}</td>
            <td
              :class="getDifference(value) > 0 ? 'bg-green' : 'bg-red'"
            >${{ getDifference(value) }}</td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  methods: {
    getDifference(shareName){
      return parseFloat(this.getCurrentValue(shareName)-this.getTotalPaid(shareName))
    },
    getCurrentValue(shareName){
      return parseFloat(this.getSharePrice(shareName)*this.getTotalQuantity(shareName))
    },
    getSharePrice(shareName) {
      let getSharePriceByName = this.sharePrice.find(
        share => share.shareName == shareName
      );
      return getSharePriceByName.price;
    },
    getAveragePrice(shareName){
      return parseFloat(this.getTotalPaid(shareName)/this.getTotalQuantity(shareName))
    },
    getTotalPaid(shareName) {
      let totalValue = 0;
      for (let i = 0; i < this.groups[shareName].length; i++) {
        totalValue += parseFloat(this.groups.[shareName][i].price*this.groups.[shareName][i].quantity);
      }
      return totalValue
    },
    getTotalQuantity(shareName) {
      let quantity = 0;
      for (let i = 0; i < this.groups[shareName].length; i++) {
        quantity += parseInt(this.groups.[shareName][i].quantity);
      }
      return quantity
    },
    groupBy(array, key) {
      const result = {};
      array.forEach(item => {
        if (!result[item[key]]) {
          result[item[key]] = [];
        }
        result[item[key]].push(item);
      });
      return result;
    }
  },
  computed: {
    groups() {
      return this.groupBy(this.holdings, "shareName");
    },

  },
  data() {
    return {
      price: "",
      sharePrice: this.$store.state.sharePrice,
      holdings: this.$store.getters.isNotSold
    };
  }
};
</script>

<style lang="scss" scoped></style>
