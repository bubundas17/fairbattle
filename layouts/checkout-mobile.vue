<template>
  <v-app>
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
      <span class="px-2">SolidTorrents.net &copy;2018</span> <v-spacer/> <nuxt-link to="/about" :class="darkMode ? 'white--text': ''" class="px-2">About Us</nuxt-link> | <nuxt-link to="/donate" class="px-2" :class="darkMode ? 'white--text': ''">Donate</nuxt-link> | <nuxt-link to="/dmca" class="px-2" :class="darkMode ? 'white--text': ''">DMCA</nuxt-link> | <nuxt-link class="px-2" :class="darkMode ? 'white--text': ''" to="/privacy">Privacy Policy</nuxt-link>
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
          {icon: 'videocam', title: 'Videos', to: '/categories/videos'},
          {icon: 'music_note', title: 'Music', to: '/categories/music'},
          {icon: 'book', title: 'eBooks', to: '/categories/ebook'}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Solid Torrents'
      }
    },
    methods: {},
    computed: {
      isLoading() {
        return this.$store.state.loading.loading
      }
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
