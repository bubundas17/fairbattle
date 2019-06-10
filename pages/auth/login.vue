<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="container-box">
        <v-layout column class="login-box">
          <v-card class="ma-2">
            <v-card-title><h2 class="headline">Please Login Or Signup</h2></v-card-title>
            <v-card-text>
              <v-text-field label="Username or phone" v-model="username"></v-text-field>
              <v-text-field label="Password" :type="showPass ? 'text' : 'password'" v-model="password">
                <template slot="append">
                  <v-btn flat small :color="showPass ? 'teal' : 'gray'"  @click="showPass =!showPass" icon>
                    <v-icon>{{showPass ? "mdi-eye-off" : 'mdi-eye'}}</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn class="teal" dark @click="login" :loading="loading" :disabled="loading">Login</v-btn>
            </v-card-actions>
          </v-card>

          <v-card class="ma-2">
            <v-card-actions >
              <v-btn color="green" outline block dark to="/auth/signup">Create An Account</v-btn>
              <v-btn color="orange" outline block dark to="/auth/forgotpass">Forgot Password?</v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </div>


    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data() {
      return {
        showPass: false,
        username: '',
        password: '',
        loading: false
      }
    },
    methods: {
      async login() {
        this.loading = true
        try {
            let data = await this.$store.dispatch('login', {username: this.username, password: this.password})
            this.showAlert("success", data)
          } catch (e) {
            this.showAlert("error", e)
          }
        this.loading = false
      },

    },
    watch: {
      isLoggedIn(value){
        let self = this;
        if(value)self.$router.push("/")
      }
    },
    mounted() {
    }
  }
</script>
<style scoped>
  .container-box{
    background: #43cea2; /* fallback for old browsers */
    background: linear-gradient(to bottom right, #43cea2, #185a9d); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    height: 100vh;
    position: fixed;
    width: 100vw;
    top: 0;
  }
  .login-box{
    max-width: 500px;
    margin: 200px auto;
  }
</style>
