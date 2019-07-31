<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-1">
        <v-toolbar class="primary" dark flat>
          <v-toolbar-title>Purchase Offers</v-toolbar-title>
          <v-spacer/>
          <add-faircoin-offer-dialog :add-dialog="addDialog" @reload="reload"/>
        </v-toolbar>
        <v-card-text>
          <v-list>
            <template v-for="offer in offers">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ offer.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action><v-btn icon @click="showEditDialog(offer)"><v-icon>mdi-circle-edit-outline</v-icon></v-btn></v-list-tile-action>
                <v-list-tile-action><v-btn @click="deleteMethod(offer._id)" icon><v-icon>mdi-delete-empty</v-icon></v-btn></v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <edit-faircoin-offer-dialog :dialog="editDialog" @close="editDialog = !editDialog" :editData="editData" @reload="reload"></edit-faircoin-offer-dialog>
  </v-layout>
</template>

<script>
  import EditFaircoinOfferDialog from '../../../components/admin/faircoin/EditFaircoinMethodDialog'
  import AddFaircoinOfferDialog from '../../../components/admin/faircoin/AddFaircoinOfferDialog'

  export default {
    components: { AddFaircoinOfferDialog, EditFaircoinOfferDialog },
    layout: 'admin',
    async asyncData({ app }) {
      let offers = (await app.$axios.$get('/purchase')).offers
      return {
        offers
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
        this.offers = (await this.$axios.$get('/purchase')).offers
      },
      async deleteMethod(id){
        if (confirm("Are You Sure Want To Delete The Offer?")){
          try {
            await this.$axios.$delete('/purchase/'+id)
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

