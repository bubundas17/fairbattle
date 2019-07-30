<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-dialog v-model="addDialog" persistent max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn dark icon v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Add Faircoin Offer</v-card-title>
      <v-card-text>
        <v-text-field label="Title" v-model="title"></v-text-field>
        <v-textarea label="Description" v-model="description"></v-textarea>
        <v-layout row>
          <v-text-field class="ma-1" label="Price In INR" type="Number" v-model="inr"></v-text-field>
          <v-text-field class="ma-1" label="Faircoin Credit" type="Number" v-model="credit"></v-text-field>
        </v-layout>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="addDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" flat @click="submit">Add</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'add-faircoin-offer-dialog',
    props: {
      addDialog: {}
    },
    data() {
      return {
        title: '',
        description: '',
        inr: 0,
        credit: 0
      }
    },
    methods: {
      async submit() {
        try {
          await this.$axios.$post('/purchase', {
            title: this.title,
            description: this.description,
            inr: this.inr,
            credit: this.credit
          })
          this.showAlert('success', 'Redeem Method Successfully Added')
          this.$emit('reload')
          this.addDialog = false
        } catch (e) {
          console.log(e)
          this.showAlert('error', 'Error In adding Redeem Method.')

        }

      }

    }
  }
</script>
