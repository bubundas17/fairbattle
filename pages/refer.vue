<template>
    <v-layout row erap>
      <v-flex xs12>
        <v-card class="ma-1">
          <v-card-title><h1 class="title">Refer And Earn</h1></v-card-title>
          <v-card-text>
            <p class="body-2">
              Refer and earn money,
            </p>
            <p class="body-1">Now you can earn Money by Inviting Friends to this app.</p>
            <v-card flat class="green white--text">
              <v-card-text class="text-xs-center title">
                Use The referal Code: <br />
                {{ user.username }}
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'refer.vue'
  }
</script>

<style scoped>

</style>
