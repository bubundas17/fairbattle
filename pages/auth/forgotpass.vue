<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-2">
        <v-card-title><h1 class="title">Reset Password</h1></v-card-title>
        <v-card-text>
          <v-text-field label="Enter Username Or Phone">
            <template slot="append">
              <v-btn flat color="teal">Send OTP</v-btn>
            </template>
          </v-text-field>
          <v-text-field label="Enter OTP" disabled/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/> <v-btn color="teal" dark>Reset Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
  export default {
    name: 'forgotpass'
  }
</script>

<style scoped>

</style>
