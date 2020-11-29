<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Forgot Password</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="forgotPassword">
              <v-text-field
                prepend-icon="person"
                v-model="email"
                label="Email"
                type="email"
                name="email"
              >
              </v-text-field>

              <v-card-actions>
                <v-btn to="/" color="error">BACK</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="isValid" type="submit" color="success"
                  >Reset Password</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
        <v-alert v-if="success" color="green" dark>
          {{ success }}
        </v-alert>
        <v-alert v-if="error" color="red" dark>
          {{ error }}
        </v-alert>
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
      error: "",
      success: ""
    };
  },
  computed: {
    isEmailValid() {
      if (this.email) return true;
      else return false;
    },
    isValid() {
      if (this.isEmailValid) return false;
      else return true;
    }
  },
  methods: {
    forgotPassword() {
      auth
        .sendPasswordResetEmail(this.email)
        .then(() => (this.success = "Succesfully resetting the password."))
        .catch(error => (this.error = error));
    }
  }
};
</script>

<style lang="scss" scoped></style>
