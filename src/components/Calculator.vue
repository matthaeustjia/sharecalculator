<template>
  <div>
    <MainBox>
      <v-form>
        <v-container class="v-flex">
          <v-row
            ><v-select
              v-model="broker"
              label="Broker"
              :items="brokerList"
              item-text="shareName"
              required
            ></v-select
          ></v-row>
          <v-row>
            <v-col>
              <v-select
                label="Quantity/Value($)"
                v-model="selectedOptions"
                :items="options"
              ></v-select>
            </v-col>
            <v-col v-if="selectedOptions == 'Quantity'">
              <v-text-field
                v-model="quantity"
                label="Quantity"
                required
                type="number"
              ></v-text-field
            ></v-col>
            <v-col v-else>
              <v-text-field
                v-model="value"
                label="Value ($)"
                required
                type="number"
              ></v-text-field
            ></v-col>
            <v-col v-if="computedQuantity && selectedOptions == 'Value'">
              {{ computedQuantity }} units</v-col
            >
          </v-row>
          <v-row> </v-row>
          <v-row>
            <v-text-field
              v-model="buyPrice"
              label="Buying Price"
              required
              type="number"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="sellPrice"
              label="Selling Price"
              required
              type="number"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              readonly
              v-model="brokerFee"
              label="BrokerageFee"
              required
              type="number"
            ></v-text-field>
          </v-row>
        </v-container>
      </v-form>
    </MainBox>
    <v-alert v-if="totalProfit > 0" color="success">
      <div>${{ totalProfit }}</div>
      <div>{{ getDifferencePercentage }}%</div>
    </v-alert>
    <v-alert v-else color="error">
      <div>${{ totalProfit }}</div>
      <div>{{ getDifferencePercentage }}%</div>
    </v-alert>
  </div>
</template>

<script>
import MainBox from "@/components/MainBox";
export default {
  data() {
    return {
      brokerList: ["SelfWealth", "Commsec"],
      options: ["Quantity", "Value"],
      value: "",
      selectedOptions: "Quantity",
      quantity: "",
      buyPrice: "",
      sellPrice: "",
      broker: "SelfWealth"
    };
  },
  computed: {
    computedQuantity() {
      if (this.selectedOptions == "Quantity") return this.quantity;
      else {
        return parseInt(this.value / this.buyPrice);
      }
    },
    total() {
      return this.computedQuantity * this.sellPrice;
    },
    totalProfit() {
      return parseFloat(
        (this.sellPrice - this.buyPrice) * this.computedQuantity -
          this.brokerFee
      ).toFixed(3);
    },
    valueDifference() {
      return this.sellPrice - this.buyPrice;
    },
    getDifferencePercentage() {
      return parseFloat((this.valueDifference / this.buyPrice) * 100).toFixed(
        2
      );
    },
    brokerFee() {
      if (this.broker == "SelfWealth") {
        return 9.5 * 2;
      } else {
        if (this.total <= 1000) {
          return 10 * 2;
        } else if (this.total > 1000 && this.total <= 10000) {
          return 19.95 * 2;
        } else if (this.total > 10000 && this.total <= 25000) {
          return 29.95 * 2;
        } else {
          return this.total * 0.0012 * 2;
        }
      }
    }
  },
  components: {
    MainBox
  }
};
</script>
