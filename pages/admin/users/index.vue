<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-1">
        <v-card-title><h1 class="headline">Users</h1></v-card-title>
        <v-card-text>
          <v-list two-line>
            <template v-for="user in users" >
              <v-list-tile :key="user._id">
                <v-list-tile-content>
                  <v-list-tile-title>{{user.name}} - {{user.username}}</v-list-tile-title>
                  <v-list-tile-sub-title>Kills: {{ user.kills }}, Credits: {{ user.credits }}, Earned: {{ user.earned }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action><v-btn icon :to="`/admin/users/${ user._id }`"><v-icon>mdi-account-edit</v-icon></v-btn></v-list-tile-action>
              </v-list-tile>
              <v-divider/>
            </template>

          </v-list>
        </v-card-text>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'index',
    layout: 'admin',
    async asyncData({app}){
      let users =  (await app.$axios.$get("/users")).users
      return {
        users
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
