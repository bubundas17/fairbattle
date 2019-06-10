<template>
  <v-menu :close-on-content-click="false" bottom offset-y>
    <v-btn slot="activator" flat>
      <v-icon left>account_circle</v-icon>
      {{ user.name }}
    </v-btn>
    <v-card width="250px">
      <v-list>
        <v-list-tile avatar two-line>
          <v-list-tile-avatar>
            <v-avatar class="indigo">
              <v-icon dark>account_circle</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <h2 class="title">{{ user.name }}</h2>
            </v-list-tile-title>
            <v-list-tile-sub-title>
              {{ user.admin ? "Server Admin" : "Solid Member"}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

        <v-list-tile to="/profile" dense>
          <v-list-tile-avatar>
            <v-icon :loading="loading">verified_user</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            Profile
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/admin" v-if="user.admin" dense>
          <v-list-tile-avatar>
            <v-icon :loading="loading">settings</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            Admin Panel
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logout" dense>
          <v-list-tile-avatar>
            <v-icon :loading="loading">mdi-logout</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
  export default {
    layout: "user",
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
