<template>
  <div id="app">
    <v-tabs fixed-tabs dark>
      <v-tab @click="type = 'login'">Login</v-tab>
      <v-tab @click="type = 'calculator'">Calculator</v-tab>
    </v-tabs>
    <LoginForm v-if="type == 'login'" />
    <Calculator v-else />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import Calculator from "@/components/Calculator";

export default {
  data() {
    return {
      type: "login"
    };
  },
  components: {
    LoginForm,
    Calculator
  }
};
</script>

<style lang="scss" scoped></style>
