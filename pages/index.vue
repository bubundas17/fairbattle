<template>
  <v-layout justify-space-around column>
    <v-layout>
      <Pubg-home-banner/>
    </v-layout>
    <v-layout id="download-links" class="blue-grey darken-4">
      <v-container class="py-5">
        <h1 class="title text-xs-center white--text block">Download Fair Battle App</h1>
        <div class="text-xs-center mt-3">
          <v-btn v-if="data.release.meta.google_play_link" :href="data.release.meta.google_play_link"><v-icon left >mdi-google-play</v-icon>Google Play</v-btn>
          <v-btn v-if="data.release.meta.direct_dl_link" :href="data.release.meta.direct_dl_link"><v-icon left >mdi-cloud-download</v-icon>Download APK</v-btn>
        </div>
      </v-container>
    </v-layout>
    <v-layout column id="how-to-earn">
      <v-container>
        <h1 class="text-xs-center pt-3"> How To Earn?</h1>
        <p class="body-1 text-xs-center">Play in live eSports Tournaments <br>and Get Cash rewords straight to your Bank
          or PayTm account.</p>

        <v-layout row wrap>
          <v-flex md4>
            <v-card flat>
              <v-card-text class="text-xs-center">
                <div>
                  <div class="steps-container">
                    <img src="../assets/images/icons/notes.svg" alt="">
                  </div>
                  <h2 class="title mt-3">REGISTER</h2>
                  <h2 class="body-2 mt-1">Create Your FairBattle Account.</h2>
                </div>

              </v-card-text>

            </v-card>

          </v-flex>
          <v-flex md4>
            <v-card flat>
              <v-card-text class="text-xs-center">
                <div>
                  <div class="steps-container">
                    <img src="../assets/images/icons/tournament.svg" alt="">
                  </div>
                  <h2 class="title mt-3">PLAY</h2>
                  <h2 class="body-2 mt-1">Get yourself listed in tournaments</h2>
                </div>

              </v-card-text>

            </v-card>
          </v-flex>
          <v-flex md4>
            <v-card flat>
              <v-card-text class="text-xs-center">
                <div>
                  <div class="steps-container">
                    <img src="../assets/images/icons/award.svg" alt="">
                  </div>
                  <h2 class="title mt-3">WIN</h2>
                  <h2 class="body-2 mt-1">Earn Real Cash based on your Performance during the tournament.</h2>
                </div>

              </v-card-text>

            </v-card>
          </v-flex>
        </v-layout>

        <p class="body-1 text-xs-center pt-2">We host around 5 PUBG Mobile and Emulator Tournaments rooms Each and every
          day. Just join rooms
          and Earn money according to your performance </p>
        <!--        <img src="../assets/images/banners/home-banner-join-process.svg" style="padding: 0 10%">-->
      </v-container>


    </v-layout>
  </v-layout>
</template>

<script>
  import PubgHomeBanner from '../components/Banners/PubgHomeBanner'

  export default {
    components: { PubgHomeBanner },
    async asyncData({app}){
      let data = await app.$axios.$get("/")
      // console.log(data.data)
      return {
        data: data.data
      }
    },
    data() {
      return {
        data: {
          release: {
            meta: {}
          }
        }
      }
    }
  }
</script>
<style scoped>
  #download-links {

  }

  .steps-container {
    margin: 0 auto;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 1px dashed black;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .steps-container > img {
    display: block;
    height: 40px;
  }

  #how-to-earn > p {
    max-width: 60%;
    margin: 0 auto;
  }

  #how-to-earn {
    background: white;
  }
</style>
