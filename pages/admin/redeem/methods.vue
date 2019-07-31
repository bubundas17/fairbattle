<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-1">
        <v-toolbar class="primary" dark flat>
          <v-toolbar-title>Redeem Methods</v-toolbar-title>
          <v-spacer/>
          <add-redeem-method-dialog :add-dialog="addDialog" @reload="reload"/>
        </v-toolbar>
        <v-card-text>
          <v-list>
            <template v-for="method in methods">
              <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ method.title }}</v-list-tile-title>
              </v-list-tile-content>
                <v-list-tile-action><v-btn icon @click="showEditDialog(method)"><v-icon>mdi-circle-edit-outline</v-icon></v-btn></v-list-tile-action>
                <v-list-tile-action><v-btn @click="deleteMethod(method._id)" icon><v-icon>mdi-delete-empty</v-icon></v-btn></v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <edit-redeem-method-dialog :dialog="editDialog" @close="editDialog = !editDialog" :editData="editData" @reload="reload"></edit-redeem-method-dialog>
  </v-layout>
</template>

<script>
  import AddRedeemMethodDialog from '../../../components/admin/redeem/AddRedeemMethodDialog'
  import EditRedeemMethodDialog from '../../../components/admin/redeem/EditRedeemMethodDialog'

  export default {
    name: 'methods',
    components: { EditRedeemMethodDialog, AddRedeemMethodDialog },
    layout: 'admin',
    async asyncData({ app }) {
      let methods = (await app.$axios.$get('/redeem')).methods
      return {
        methods
      }
    },
    data() {
      return {
        addDialog: false,
        editDialog: false,
        editData: null
      }
    },
    methods: {
      async reload() {
        this.methods = (await this.$axios.$get('/redeem')).methods
      },
      async deleteMethod(id){
        if (confirm("Are You Sure Want To Delete The Method?")){
          try {
            await this.$axios.$delete('/redeem/'+id)
            await this.reload()
            this.showAlert("success", "Redeem Method Successfully Deleted")
          } catch (e) {
            console.log(e)
            this.showAlert("error", "Error In Deleting Redeem Method.")
          }
        }

      },
      showEditDialog(data){
        this.editData = data
        this.editDialog = true
      }
    }
  }
</script>

