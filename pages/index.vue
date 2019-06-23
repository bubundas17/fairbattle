<template>
  <v-layout justify-space-around column>
    <v-layout>
      <Pubg-home-banner/>
    </v-layout>
    <v-layout column id="how-to-earn" >
      <h1 class="text-xs-center pt-3"> How To Earn?</h1>
      <p class="body-1 text-xs-center">Play in live eSports Tournaments <br>and Get Cash rewords straight to your Bank
        or PayTm account.</p>
      <p class="body-1 text-xs-center pt-2">We host around 5 PUBG Mobile and Emulator Tournaments rooms Each and every day. Just join rooms
        and Earn money according to your performance </p>
    </v-layout>
  </v-layout>
</template>

<script>
  import PubgHomeBanner from '../components/Banners/PubgHomeBanner'

  export default {
    components: { PubgHomeBanner },
    data() {
      return {}
    }
  }
</script>
<style scoped>
  #how-to-earn > p{
    max-width: 60%;
    margin: 0 auto;
  }
  #how-to-earn{
    background: white;
  }
</style>
