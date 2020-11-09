<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="signIn">
              <v-text-field
                prepend-icon="person"
                v-model="email"
                name="email"
                label="Login"
                type="text"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                v-model="password"
                label="Password"
                type="password"
              ></v-text-field>

              <v-card-text>
                <div>
                  No account?
                  <router-link to="/signup">create one!</router-link>
                </div>
                <div>
                  <router-link to="/forgot">
                    Can't access your account?</router-link
                  >
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="success">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>

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
      error: "",
      success: "",
    };
  },
  methods: {
    signIn() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => (this.error = error));
    },
  },
};
</script>

<style lang="scss" scoped></style>
