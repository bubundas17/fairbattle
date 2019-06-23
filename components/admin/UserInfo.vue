<template>
  <v-card>
    <v-list two-line>
      <v-list-tile v-if="loading">
        <v-list-tile-content>
          Loading: <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-else>
        <v-list-tile-content>
          <v-list-tile-title>@{{ user.username }} | Joined {{ user.created | fromNow }}</v-list-tile-title>
          <v-list-tile-sub-title> {{user.phone}} | Credits: {{ user.credits }} | Kills: {{ user.kills }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon :to="`/admin/users/${ user._id }`" ><v-icon>mdi-account-edit</v-icon></v-btn>
        </v-list-tile-action>
      </v-list-tile>

    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'UserInfo',
    props: ['user-id'],
    data() {
      return {
        user: {},
        loading: false
      }
    },
    async mounted() {
      this.loading = true
      let user = (await this.$axios.$get('/users/' + this.userId)).user
      this.loading = false
      this.user = user
    }
  }
</script>

<style scoped>

</style>
