<template>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="ma-1">
          <v-card-title class="primary white--text"><h1 class="title">All Requests</h1></v-card-title>
          <v-list two-line>
            <v-list-tile v-for="request in requests" :key="request._id">
              <v-list-tile-content>
                <v-list-tile-title> {{ request.title }} - {{ ststusTest(request.status) }} - {{ request.user.username }} - {{ request.user.credits }} FC Left</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="openEditDialog(request)" ><v-icon>mdi-circle-edit-outline</v-icon></v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <edit-redeem-request :dialog="editDialog" :editData="editData" @reload="reload" @close="editDialog = !editDialog"></edit-redeem-request>
    </v-layout>
</template>

<script>
  import EditRedeemMethodDialog from '../../../components/admin/redeem/EditRedeemMethodDialog'
  import EditRedeemRequest from '../../../components/admin/redeem/EditRedeemRequest'
  export default {
    name: 'index',
    components: { EditRedeemRequest, EditRedeemMethodDialog },
    layout: "admin",
    async asyncData({ app }) {
      let requests = (await app.$axios.$get('/redeem/requests')).requests;
      return {
        requests
      }
    },
    data(){
      return {
        editDialog: false,
        editData: {}
      }
    },
    methods: {
      ststusTest(val){
        let text = ""
        switch (val) {
          case 1: text =  "Pending"; break;
          case 2: text = "Success"; break;
          case 3: text = "Failed"; break;
          case 4: text = "Cancelled"; break;
        }
        return text
      },
      async reload(){
        this.requests = (await this.$axios.$get('/redeem/requests')).requests;
      },
      openEditDialog(data){
        this.editData = data
        this.editDialog = true
      }
    }
  }
</script>

<style scoped>

</style>
