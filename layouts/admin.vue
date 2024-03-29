<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
    >
      <v-toolbar>
        <v-toolbar-title>Admin Panel</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <template v-for="item in items">
          <v-list-group
            v-if="item.nested"
            v-model="item.active"
            :key="item.title"
            :prepend-icon="item.action"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="subItem.to"
              exact
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <v-list-tile
            :key="item.title"
            v-if="!item.nested"
            :to="item.to"
          >
            <v-list-tile-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      fixed
      app
      dark
      color="nav"
    >
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-lg-and-up"/>
      <v-spacer/>
      <v-toolbar-items>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <!--        <v-btn flat v-for="item in items" :to="item.to" :key="item.title">-->
        <!--          <v-icon left>{{item.icon}}</v-icon>-->
        <!--          {{item.title}}-->
        <!--        </v-btn>-->
        <LoginDialog v-if="!isLoggedIn"/>
        <ProfileDialog v-if="isLoggedIn"/>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <alerts></alerts>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
  import Alerts from '../components/Alerts'
  import LoginDialog from '../components/LoginDialog'
  import ProfileDialog from '../components/ProfileDialog'

  export default {
    components: { Alerts, LoginDialog, ProfileDialog },
    middleware: 'loggedin',
    data() {
      return {
        searchKeyword: '',
        drawer: true,
        items: [
          {
            action: 'pages',
            title: 'Dashboard',
            nested: false,
            to: '/admin'
          }, {
            action: 'mdi-account-circle',
            title: 'User',
            nested: true,
            items: [
              { title: 'All Users', to: '/admin/users' },
              { title: 'Add User', to: '/admin/users/new' }
            ]
          },

          {
            action: 'mdi-google-play',
            title: 'Matches',
            nested: true,
            items: [
              { title: 'Create New', to: '/admin/matches/new' },
              { title: 'All Matches', to: '/admin/matches/' },
              { title: 'Future Matches', to: '/admin/matches/future' },
              { title: 'Ongoing Matches', to: '/admin/matches/ongoing' }
            ]
          },
          {
            action: 'mdi-format-list-bulleted-square',
            title: 'Transactions',
            nested: true,
            items: [
              { title: 'Transactions', to: '/admin/transactions/' },
              { title: 'TopUp Users', to: '/admin/transactions/topup' }
            ]
          },
          {
            action: 'mdi-wallet-giftcard',
            title: 'Redeem',
            nested: true,
            items: [
              { title: 'Redeem Methods', to: '/admin/redeem/methods' },
              { title: 'Pending Requests', to: '/admin/redeem/pending' },
              { title: 'All Requests', to: '/admin/redeem/' }
            ]
          },
          {
            action: 'mdi-wallet',
            title: 'Fair Coin',
            nested: true,
            items: [
              { title: 'Offers', to: '/admin/faircoin/' },
              { title: 'Purchase History', to: '/admin/faircoin/history/' },
            ]
          },
          {
            action: 'settings',
            title: 'Settings',
            nested: true,
            items: [
              { title: 'Main Settings', to: '/admin/settings/' },
              { title: 'App Version', to: '/admin/settings/version/' },
            ]
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Solid Torrents'
      }
    },
    methods: {
      search() {
        this.$router.push({ path: '/search', query: { q: this.searchKeyword } })
      }
    },
    computed: {
      searchQ() {
        return this.$route.query.q
      }
    },
    watch: {
      searchQ(value) {
        this.searchKeyword = value
      }
    },
    mounted() {
      this.searchKeyword = this.$route.query.q
    }
  }
</script>
<style>
  .blur {
    filter: blur(5px);
  }
</style>
