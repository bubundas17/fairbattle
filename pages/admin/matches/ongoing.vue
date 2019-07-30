<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-2">
        <v-list two-line>
          <v-list-tile v-for="match in matches" :key="match._id">
            <v-list-tile-content>
              <v-list-tile-title> {{ match.name }} #{{ match.count }} - {{ match.date | fromNow }}</v-list-tile-title>
              <v-list-tile-sub-title> {{ match.date | formatDate }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon :to="`/admin/matches/${match._id}`"><v-icon>mdi-circle-edit-outline</v-icon></v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'ongoing',
    layout: 'admin',
    async asyncData({ app }) {
      let matches = (await app.$axios.$get('/matches', {params: { status: 2 }})).matches
      return {
        matches
      }
    }
  }
</script>

<style scoped>

</style>
