<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-dialog v-model="dialog" persistent max-width="600">
    <!--    <template v-slot:activator="{ on }">-->
    <!--      <v-btn dark icon v-on="on">-->
    <!--        <v-icon>mdi-plus</v-icon>-->
    <!--      </v-btn>-->
    <!--    </template>-->
    <v-card>
      <v-card-title class="headline">Edit Redeem Request</v-card-title>
      <v-card-text>
        <UserInfo v-if="user" :userId="user._id"></UserInfo>
        <v-text-field label="Title" v-model="title"></v-text-field>
        <v-textarea label="Note" v-model="note"></v-textarea>
        <v-text-field label="Coins" type="Number" v-model="coins"></v-text-field>
        <v-select :items="statusTexts" item-text="text" v-model="status">

        </v-select>
        <p class="title">Fields</p>
        <template v-for="(field, i) in fields">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field class="ma-1" :label="field.label" v-model="field.value"></v-text-field>
            </v-flex>
          </v-layout>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="$emit('close')">Cancel</v-btn>
        <v-btn color="green darken-1" flat @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import UserInfo from '../../admin/UserInfo'
  export default {
    name: 'edit-redeem-request',
    components: { UserInfo },
    props: ["dialog", "editData"],
    data() {
      return {
        title: '',
        note: '',
        coins: 0,
        user: '',
        status: 1,
        statusTexts: [
          {value: 1,  text: "Pending"},
          {value: 2,  text: "Success"},
          {value: 3,  text: "Failed"},
          {value: 4,  text: "Cancelled"},
        ],
        fields: [
          {label: '', validator: '', fieldType: ''}
        ]
      }
    },
    methods: {

      addField(){
        this.fields.push({ label: '', validator: '', fieldType: '' })
      },
      removeField(i){
        this.fields.splice(i, 1)
      },
      async submit(){
        try {
          await this.$axios.$put('/redeem/requests/' + this.editData._id, {
            title: this.title,
            note: this.note,
            coins: this.coins,
            fields: this.fields,
            status: this.status,
          })
          this.showAlert("success", "Redeem Request Successfully Edited")
          await this.$emit("reload")
          this.$emit("close")
        } catch (e) {
          console.log(e)
          this.showAlert("error", "Error In adding Redeem Method.")

        }

      },

    },
    watch: {
      editData(value){
        let refVal = value || {}
        this.title = refVal.title
        this.note = refVal.note
        this.user = refVal.user
        this.coins = refVal.coins
        this.fields = refVal.fields
      }
    },
    mounted() {

    }
  }
</script>
