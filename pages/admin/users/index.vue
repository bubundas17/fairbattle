<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-1">
        <v-card-title class="secondary white--text"><h1 class="headline">Users</h1></v-card-title>

        <v-card-text>
          <v-text-field solo flat label="Search users..." >
            <template slot="append">
              <v-btn flat icon> <v-icon>mdi-account-search-outline</v-icon></v-btn>
            </template>
          </v-text-field>
          <v-list two-line class="">
            <template v-for="user in users" >
              <v-list-tile :key="user._id">
                <v-list-tile-content>
                  <v-list-tile-title>{{user.name}} - {{user.username}}</v-list-tile-title>
                  <v-list-tile-sub-title>Kills: {{ user.kills }}, Credits: {{ user.credits }}, Earned: {{ user.earned }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action><v-btn icon :to="`/admin/users/${ user._id }`"><v-icon>mdi-account-edit</v-icon></v-btn></v-list-tile-action>
              </v-list-tile>
            </template>

          </v-list>
        </v-card-text>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
  // TODO: Implement User Search
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
