<template>
  <div>
    <MainBox>
      <div class="invest-header">
        <span> Add Stock </span>
      </div>
      <AddBuy />
      <AddDividend
    /></MainBox>
  </div>
</template>

<script>
import AddBuy from "@/components/AddBuy";
import MainBox from "@/components/MainBox";
import AddDividend from "@/components/AddDividend";

export default {
  data() {
    return {
      type: "stock"
    };
  },
  components: {
    AddBuy,
    MainBox,
    AddDividend
  }
};
</script>

<style lang="scss" scoped></style>
