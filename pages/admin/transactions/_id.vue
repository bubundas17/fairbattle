<template>
  <v-layout column v-if="loading">

    <v-card class="ma-2">
      Loading
    </v-card>
  </v-layout>

  <v-layout column v-else>
    <UserInfo :user-id="transaction.user" class="ma-2"></UserInfo>

    <v-card class="ma-2">
      <v-card-text>
        <v-text-field v-model="transaction.title" label="Title"/>
        <v-text-field v-model="transaction.amount" label="amount" type="number"/>
        <v-textarea v-model="transaction.note" label="note"/>
        <v-select
          class="ma-2"
          :items="statusList"
          v-model="transaction.status"
          item-text="text"
          item-value="value"
          label="Status"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat color="red darken-2" :disabled="transaction.status !== 2" @click="failAndRefund">Failed & Refund</v-btn>
        <v-btn flat color="teal" @click="save">Save</v-btn>
        <v-btn flat color="green darken-2"  :disabled="transaction.status !== 2" @click="markAsProceed">Mark As Processed</v-btn>
      </v-card-actions>
    </v-card>
    <upi-qr-code :transaction="transaction" class="ma-2"></upi-qr-code>
  </v-layout>
</template>

<script>
  import UserInfo from '../../../components/admin/UserInfo'
  import UpiQrCode from '../../../components/admin/UpiQrCode'

  export default {
    components: { UpiQrCode, UserInfo },
    layout: 'admin',
    data() {
      return {
        transaction: {},
        statusList: [
          { value: 1, text: 'Success' },
          { value: 2, text: 'Processing' },
          { value: 3, text: 'Failed' },
          { value: 4, text: 'Cancelled' }
        ],
        loading: true,
      }
    },
    methods: {
      async save() {
        try {
          let data = await this.$axios.$put(`/transaction/${this.$route.params.id}`, this.transaction)
          this.showAlert('success', data.message)
        } catch (e) {
          this.showAlert('error', 'Error In Saving Data')
        }
      },
      async failAndRefund() {
        let result = window.confirm("Are you sure want to Mark This Transaction As Failed And Refund The Amount?")
        if (result){
          let self = this
          this.transaction.status = 3;
          let data = await this.$axios.$post(`/transaction/`, {
            user: this.transaction.user,
            title: "Refund Of TXN " + this.transaction.txnId,
            note:  `Refund Credited For ` + this.transaction.txnId,
            amount: Math.abs(self.transaction.amount)
          })
          await this.save()
          this.$router.go(-1)
        }
      },
      async markAsProceed() {
        let result = window.confirm("Please Make Sure You Credited The Amount First.")
        if (result){
          this.transaction.status = 1;
          await this.save()
          this.$router.go(-1)
        }
      }
    },
    async mounted() {
      this.loading = true
      let transaction = await this.$axios.$get(`/transaction/${this.$route.params.id}`)
      this.transaction = transaction.transaction
      this.loading = false
    }
  }
</script>

<style scoped>

</style>
