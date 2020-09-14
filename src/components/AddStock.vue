<template>
  <div>
    <v-text-field
      v-model="shareName"
      label="Share Name"
      required
      type="text"
    ></v-text-field>
    <v-btn
      block
      @click="addStock()"
      color="success"
      :disabled="!isValid"
      class="mr-4"
      >Add</v-btn
    >
  </div>
</template>

<script>
import { db } from "@/firebase";
export default {
  data() {
    return {
      shareName: "",
    };
  },
  computed: {
    isValid() {
      if (this.shareName) {
        return true;
      }
      return false;
    },
  },
  methods: {
    addStock() {
      var shareName = this.shareName.toUpperCase();
      db.ref("ShareList").push({
        shareName: this.shareName.toUpperCase(),
        owner: this.$store.state.user,
      });
      db.ref("sharePrice")
        .child(shareName)
        .set({
          shareName: shareName,
          nextUpdate: 0,
        });
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.uppercase {
  text-transform: uppercase;
}
</style>
