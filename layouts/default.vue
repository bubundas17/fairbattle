<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      right
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-toolbar-title v-text="item.title" class="ml-2"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      dark
      color="nav"
    >
      <!--      <img src="@/assets/images/logo.svg" height="38px" width="38px"/>-->
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-toolbar-items>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in items" :to="item.to" :key="item.title">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
<!--        <LoginDialog v-if="!isLoggedIn"/>-->
        <ProfileDialog v-if="isLoggedIn"/>
      </v-toolbar-items>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"/>
    </v-toolbar>
    <v-content>
      <alerts></alerts>
      <nuxt/>
    </v-content>

    <v-footer height="auto"  color="blue-grey darken-3" >
      <v-layout justify-center row wrap >
        <v-btn color="white" flat round to="/">HOME</v-btn>
        <v-btn color="white" flat round to="/about">ABOUT US</v-btn>
        <v-btn color="white" flat round to="/privacy-policy">PRIVACY POLICY</v-btn>
        <v-btn color="white" flat round to="/terms-and-condition">TRAMS AND CONDITIONS</v-btn>
        <v-btn color="white" flat round to="/refund-cancellation-policy">REFUND POLICY</v-btn>
        <v-flex black lighten-2 py-3 text-xs-center white--text xs12>
          &copy;2019 — <strong>FairBattle.net</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import Alerts from '../components/Alerts'
  import LoginDialog from '../components/LoginDialog'
  import ProfileDialog from '../components/ProfileDialog'

  export default {
    components: { Alerts, LoginDialog, ProfileDialog },
    data() {
      return {
        drawer: false,
        items: [
          { icon: 'mdi-home', title: 'Home', to: '/' },
          { icon: 'mdi-information', title: 'About', to: '/about' },
          { icon: 'mdi-phone', title: 'Contact', to: '/contact' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Fair Battle'
      }
    },
    methods: {},
    computed: {},
    transition(to, from) {
      if (!from) return 'slide-left'
      return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
    }
  }
</script>
<style>
  .blur {
    filter: blur(5px);
  }
</style>
