<template>
  <v-card v-if="ifUpi">
    <v-card-title>
      <h1 class="title">Pay {{ Math.abs(transaction.amount) }} Via UPI</h1>
    </v-card-title>
    <v-card-text>
      <canvas ref="canvas" height="500px" width="500px"></canvas>
      <p>Pay {{ Math.abs(transaction.amount) }} Via UPI to {{ upiId }} and click mark as proceed</p>
    </v-card-text>
  </v-card>
</template>

<script>
  import QRCode from 'qrcode'

  export default {
    name: 'UpiQrCode',
    props: ['transaction'],
    data() {

      return {
        regex: /[a-zA-Z0-9\.\-]{2,256}\@[a-zA-Z][a-zA-Z]{2,64}/
      }
    },
    computed: {
      ifUpi() {
        return this.regex.test(this.transaction.note)
      },
      upiId() {
        return this.transaction.note.match(this.regex)[0]
      },
      amount() {
        return Math.abs(this.transaction.amount)
      }
    },
    mounted() {
      if (this.ifUpi) {
        QRCode.toCanvas(this.$refs.canvas, `upi://pay?cu=INR&pa=${this.upiId}&am=${this.amount}`, {
          errorCorrectionLevel: 'H'
        })
      }
    }
  }
</script>

<style scoped>

</style>
