<template>
  <v-layout column v-if="loading">
    <v-card class="ma-2">

    </v-card>
  </v-layout>
  <v-layout column v-else>
    <v-card class="ma-2">
      <v-card-title primary-title>
        <h1 class="headline">Withdrawal Requested</h1>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-tile v-for="transaction in transactions" :to="`/admin/transactions/${ transaction._id }`" :key="transaction._id">
            {{transaction.title}} - {{transaction.user.username}}
          </v-list-tile>
        </v-list>
        <v-btn block flat teal @click="loadMore" :disabled="loading" :loading="loading">Load more</v-btn>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    layout: 'admin',
    name: 'withdrawal',
    data() {
      return {
        transactions: [],
        loading: false
      }
    },
    methods: {
      async loadMore() {
        this.loading = true
        let transactions = await this.$axios.$get('/transaction/all', {
          params: {
            status: 2,
            skip: this.transactions.length
          }
        })
        this.transactions = [...this.transactions, ...transactions.transitions]
        this.loading = false
      }
    },
    async mounted() {
      this.loading = true
      let transactions = await this.$axios.$get('/transaction/all', { params: { status: 2 } })
      this.transactions = transactions.transactions
      this.loading = false
    }
  }
</script>

<style scoped>

</style>
