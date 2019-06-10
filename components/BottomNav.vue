<template>
    <v-bottom-nav
            :active.sync="activeBtn"
            :value="true"
            fixed
            color="white"
            app
            dense
    >

        <v-btn flat color="teal" @click="profileClick">
            <span>Profile</span>
            <v-icon>account_circle</v-icon>
        </v-btn>

        <v-btn flat color="teal" @click="matches" value="matches">
            <span>Play</span>
            <v-icon>mdi-gamepad-variant</v-icon>
        </v-btn>

        <v-btn flat color="teal" @click="ongoing">
            <span>Ongoing</span>
            <v-icon>mdi-av-timer</v-icon>
        </v-btn>

        <v-btn flat color="teal" @click="results">
            <span>Results</span>
            <v-icon>mdi-history</v-icon>
        </v-btn>
        <v-btn flat color="teal" @click="results">
            <span>Participated</span>
            <v-icon>mdi-calendar-multiple-check</v-icon>
        </v-btn>

    </v-bottom-nav>
</template>
<script>
    export default {
        name: 'bottom-nav',
        props: {
            matches: {},
            ongoing: {},
            profileClick: {},
            results: {}
        },
      data(){
          return {
            activeBtn: "matches"
          }
      }
    }
</script>
