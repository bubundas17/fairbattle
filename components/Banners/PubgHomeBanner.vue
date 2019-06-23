<template>
    <v-layout>
        <div class="banner">
            <div id="background"></div>
            <div id="overlay"></div>

            <div id="banner-text">
                <h1>PLAY <span>PUBG</span> EARN <span>MONEY</span></h1>
                <h2>54025 Peoples Already Got there Rewords!</h2>
                <h3>Now it's your turn</h3>
            </div>
        </div>
    </v-layout>
</template>
<script>
  export default {
    name: 'Pubg-home-banner'
  }
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Monda|Righteous&display=swap');

    .banner {
        position: relative;
        z-index: 1;
    }

    .banner > #background {
        min-width: 100vw;
        height: 45vw;
        max-height: 650px;
        min-height: 300px;
        background-image: url("~assets/images/banners/pubg-home-banner.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    .banner > #overlay {
        position: absolute;
        top: 0px;
        z-index: 2;
        background: rgb(13, 0, 96);
        background: linear-gradient(117deg, rgba(13, 0, 96, 0.81) 0%, rgba(107, 0, 88, 0.8) 100%);
        height: 100%;
        width: 100%;
    }

    .banner > #banner-text {
        position: absolute;
        bottom: 0;
        z-index: 3;
        color: white;
        width: 100%;
        text-align: center;
        height: 150px;
    }

    #banner-text > h1 {
        font-family: 'Righteous', cursive;

    }

    #banner-text > h2 {
        font-family: 'Monda', sans-serif;
        font-size: 15px;
    }

    #banner-text > h3 {
        font-family: 'Monda', sans-serif;
        font-size: 13px;
        padding-top: 10px;
    }

    #banner-text > h3:before {
        content: '';
        width: 32px;
        height: 1px;
        background: #d02121;
        position: absolute;
        margin-left: -65px;
        margin-top: 10px;
    }

    #banner-text > h3:after {
        content: '';
        width: 32px;
        height: 1px;
        background: #d02121;
        position: absolute;
        margin-left: 40px;
        margin-top: 10px;
    }


    #banner-text > h1 > span {
        color: #ff5646;
    }

    @media screen and (max-width: 900px) {
        #banner-text {
            transform: scale(0.75);
        }
    }

    @media screen and (max-width: 700px) {
        #banner-text {
            transform: scale(0.65);
        }
    }


</style>