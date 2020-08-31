<template>
  <div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(share, index) in shareList" :key="share.shareName">
            <td>{{ share.shareName }}</td>
            <td class="text-right">
              <v-btn @click="deleteStock(share, index)" small color="error">Delete</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { db } from "@/firebase";
export default {
  data() {
    return {
      shareList: this.$store.state.shareList
    };
  },
  methods: {
    deleteStock(share, index) {
      this.$store.commit("removeShareList", index);
      db.ref("ShareList")
        .child(share.key)
        .remove();
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
