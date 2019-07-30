<template>
  <v-layout row wrap>
      <v-flex xs12>
        <v-card class="ma-1">
          <v-card-title class="primary white--text title">App Version</v-card-title>
          <v-card-text>
            <v-text-field v-model="version.value" label="Version"></v-text-field>
            <p class="body-2">Release Notes</p>
            <v-editor-app v-model="version.meta.release_notes" ></v-editor-app>
            <v-text-field v-model="version.meta.direct_dl_link" label="Direct DL Link"></v-text-field>
            <v-text-field v-model="version.meta.google_play_link" label="Google Play Link"></v-text-field>
            <v-checkbox v-model="version.meta.required" label="Required Update?"></v-checkbox>
          </v-card-text>
          <v-card-actions><v-spacer/> <v-btn flat color="secondary" @click="save"> Save </v-btn></v-card-actions>
        </v-card>
      </v-flex>
  </v-layout>
</template>
<script>
  export default {
    layout: "admin",
    async asyncData({app}){
      let version = (await app.$axios.$get("/settings/app_latest_release")).settings
      return  {
        version : version || {meta: {}}
      }
    },
    data(){
      return {
        version: {},
      }
    },
    methods: {
      async save(){
        await this.$axios.$put("/settings/app_latest_release", this.version)
        this.showAlert("success", "Successfully Saved Data")
      }
    }
  }
</script>
