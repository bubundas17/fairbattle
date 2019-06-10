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
        <LoginDialog v-if="!isLoggedIn"/>
        <ProfileDialog v-if="isLoggedIn"/>
      </v-toolbar-items>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"/>
    </v-toolbar>
    <v-content>
      <alerts></alerts>
      <nuxt/>
    </v-content>
    <v-footer>
      <span class="px-2">eTournaments &copy;2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Alerts from "../components/Alerts";
  import LoginDialog from "../components/LoginDialog";
  import ProfileDialog from "../components/ProfileDialog";

  export default {
    components: {Alerts, LoginDialog, ProfileDialog},
    data() {
      return {
        drawer: false,
        items: [
          {icon: 'home', title: 'Home', to: '/'},
          {icon: 'mdi-gamepad-variant', title: 'Join Matches', to: '/matches'},
          {icon: 'music_note', title: 'Music', to: '/categories/music'},
          {icon: 'book', title: 'eBooks', to: '/categories/ebook'}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Fair Tournaments'
      }
    },
    methods: {},
    computed: {
    },
    transition (to, from) {
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
