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
          <tr v-for="share in shareList" :key="share.shareName">
            <td>{{ share.shareName }}</td>
            <td class="text-right">
              <v-btn small color="error">Delete</v-btn>
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
      shareList: [],
    };
  },
  created() {
    db.ref("ShareList").once("value", (snapshot) => {
      this.shareList = Object.values(snapshot.val());
    });
  },
};
</script>

<style lang="scss" scoped></style>
