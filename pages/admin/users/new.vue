<template>
  <v-layout row wrap>
    <v-flex xs12>
        <v-card class="ma-1">
          <v-card-title class="secondary">
            <h1 class="title white--text">Add New User</h1>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Full Name"></v-text-field>
            <v-text-field label="Username"></v-text-field>
            <v-text-field label="Phone Number"></v-text-field>
            <v-text-field label="Email ID"></v-text-field>
            <v-text-field label="Password"></v-text-field>
            <v-text-field label="Referral Code"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer/> <v-btn flat color="primary"><v-icon left>mdi-account-plus</v-icon>Add User</v-btn>
          </v-card-actions>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  // TODO: Implement the Add User Function.
  export default {
    name: 'add',
    layout: 'admin',
    data() {
      return {
        user: {
          name: '',
          username: '',
          phone: '',
          email: '',
          password: '',
          referral: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
