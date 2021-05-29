<template>
  <div>
    <MainBox>
      <v-text-field
        v-model="shareName"
        label="Share Name"
        required
        type="text"
      ></v-text-field>
      <v-btn
        @click="addStock()"
        color="success"
        :disabled="!isValid"
        class="mr-4"
        >Add</v-btn
      ></MainBox
    >
  </div>
</template>

<script>
import { db } from "@/firebase";
import MainBox from "@/components/MainBox";
export default {
  data() {
    return {
      shareName: ""
    };
  },
  computed: {
    isValid() {
      if (this.shareName) {
        return true;
      }
      return false;
    }
  },
  methods: {
    addStock() {
      var shareName = this.shareName.toUpperCase();
      db.ref("ShareList").push({
        shareName: this.shareName.toUpperCase(),
        owner: this.$store.state.user
      });
      db.ref("sharePrice")
        .child(shareName)
        .set({
          shareName: shareName,
          nextUpdate: 0,
          price: 0
        });
      this.$router.push("/");
    }
  },
  components: {
    MainBox
  }
};
</script>

<style lang="scss" scoped>
.uppercase {
  text-transform: uppercase;
}
</style>
