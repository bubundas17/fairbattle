<template>
  <v-layout column ref="container">
    <h1>Id: {{ $route.query.userid }}</h1>
    <h1>Amount: {{ $route.query.amount }}</h1>
    <v-btn @click="razorpaySubmit">Pay</v-btn>
  </v-layout>
</template>

<script>
  export default {
    name: 'checkout-mobile',
    layout: 'checkout-mobile',
    data(){
      return {
        razorpay_options: {
          key: 'rzp_live_2nxI5C6aYg0wnJ',
          amount: Number(this.$route.query.amount)*100,
          prefill:{
            name: "Bubun Das",
            email: "bubundas17@gmail.com",
            phone: "9093769664"
          }
        }
      }
    },
    mounted() {
      let script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      this.$refs.container.appendChild(script);
    },
    methods: {
      razorpaySubmit(){
        let rzp1 = new Razorpay(this.razorpay_options);
        rzp1.open();
        rzp1.modal.options.backdropClose = false;
      }
    }
  }
</script>

<style scoped>

</style>
