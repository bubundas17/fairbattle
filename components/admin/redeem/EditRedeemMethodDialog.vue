<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-dialog v-model="dialog" persistent max-width="600">
<!--    <template v-slot:activator="{ on }">-->
<!--      <v-btn dark icon v-on="on">-->
<!--        <v-icon>mdi-plus</v-icon>-->
<!--      </v-btn>-->
<!--    </template>-->
    <v-card>
      <v-card-title class="headline">Edit Redeem Method</v-card-title>
      <v-card-text>
        <v-text-field label="Title" v-model="title"></v-text-field>
        <v-textarea label="Description" v-model="description"></v-textarea>
        <v-text-field label="Cost" type="Number" v-model="cost"></v-text-field>
        <p class="title">Custom Fields</p>
        <template v-for="(field, i) in fields">
          <v-layout row wrap>
            <v-flex xs5>
              <v-text-field class="ma-1" label="Label" v-model="field.label"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field class="ma-1" label="Regex" v-model="field.validator"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field class="ma-1" label="Type" v-model="field.fieldType"></v-text-field>
            </v-flex>
            <v-flex xs1>
              <v-btn icon @click="removeField(i)"><v-icon>mdi-minus</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </template>
        <v-flex xs12> <v-btn block flat color="primary" @click="addField">Add</v-btn> </v-flex>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="$emit('close')">Cancel</v-btn>
        <v-btn color="green darken-1" flat @click="submit">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'edit-redeem-method-dialog',
    props: ["dialog", "editData"],
    data() {
      return {
        title: '',
        description: '',
        cost: 0,
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
          await this.$axios.$put('/redeem/' + this.editData._id, {
            title: this.title,
            description: this.description,
            cost: this.cost,
            fields: this.fields
          })
          this.showAlert("success", "Redeem Method Successfully Added")
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
        this.description = refVal.description
        this.cost = refVal.cost
        this.fields = refVal.fields
      }
    },
    mounted() {

    }
  }
</script>
