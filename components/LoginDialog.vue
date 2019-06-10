<template>
  <v-menu :close-on-content-click="false" bottom offset-y>
    <v-btn slot="activator" flat>
      <v-icon left>account_circle</v-icon>
      Login
    </v-btn>
    <v-card width="250px" class="pa-0 ma-0">
      <v-list>
        <v-list-tile avatar two-line>
          <v-list-tile-avatar>
            <v-avatar class="indigo">
              <v-icon dark>account_circle</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <h2 class="title">Login/Sign Up</h2>
            </v-list-tile-title>
            <v-list-tile-sub-title>
             Anonymous User
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

        <v-list-tile to="/auth/login"  dense>
          <v-list-tile-avatar>
            <v-icon :loading="loading">mdi-login</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            Login
          </v-list-tile-content>
        </v-list-tile>


        <v-list-tile to="/auth/signup" dense>
          <v-list-tile-avatar>
            <v-icon :loading="loading">mdi-account-multiple-plus-outline</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            Sign Up
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

<!--        <v-list-tile dense @click="toggleDarkMode">-->
<!--          <v-list-tile-avatar>-->
<!--            <v-icon>{{ darkMode ? "mdi-brightness-6" : "mdi-brightness-4"}}</v-icon>-->
<!--          </v-list-tile-avatar>-->
<!--          <v-list-tile-content>-->
<!--            <span>{{ darkMode ? "Light Mode" :  "Dark Mode" }}-->
<!--              <v-chip small color="teal" text-color="white"> Alpha</v-chip>-->
<!--            </span>-->
<!--          </v-list-tile-content>-->
<!--        </v-list-tile>-->
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        username: "",
        password: "",
      }
    },
    methods: {
      async login() {
        try {
          this.loading = true;
          let user = await this.$axios.$post("/login", {
            username: this.username,
            password: this.password
          });
          this.loading = false;
          this.$store.commit("user", user.user);
          this.$store.commit("loggedIn", true);
          this.$router.push("/");
          this.$router.reload();
          this.showAlert("success", "Welcome Back " + user.user.name)
        } catch (error) {
          this.loading = false;
          if (error.response.status === 401) return this.showAlert("error", error.response.data.message);
        }
      },
      async logout() {
        if (!this.loading) {
          try {
            this.$store.dispatch("logout");
            this.showAlert("success", "logged You Out.")
          } catch (error) {
            this.loading = false;
            if (error.response.status === 401) return this.showAlert("error", error.response.data.message);
          }
        }
      },
      toggleDarkMode() {
        this.$store.commit("toggleDarkMode")
      }
    }
  }
</script>
<style scoped>

</style>
