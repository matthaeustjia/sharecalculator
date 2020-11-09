<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign Up form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="signUp">
              <v-text-field
                prepend-icon="person"
                v-model="email"
                label="Email"
                type="email"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                v-model="password"
                label="Password"
                type="password"
              ></v-text-field
              ><v-text-field
                prepend-icon="lock"
                v-model="passwordConfirm"
                label="Password Confirmation"
                type="password"
              ></v-text-field>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="isValid" type="submit" color="success"
                  >SIGN UP</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { auth } from "@/firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  computed: {
    isEmailValid() {
      return true;
    },

    isValid() {
      if (
        this.isEmailValid &&
        this.password == this.passwordConfirm &&
        this.password
      )
        return false;
      else return true;
    },
  },
  methods: {
    signUp() {
      auth.createUserWithEmailAndPassword(this.email, this.password);
    },
  },
};
</script>

<style lang="scss" scoped></style>
