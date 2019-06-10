<template>
  <v-layout column wrap>
    <!--        <v-card class="mt-3">-->
    <!--            <v-card-text>-->
    <v-flex xs12>
      <UserInfo/>
    </v-flex>
    <v-flex xs12>
      <v-layout column wrap>
        <v-flex xs12>
          <v-card>
            <Stats/>
            <profile-options/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>


    <!--            </v-card-text>-->
    <!--        </v-card>-->
  </v-layout>
</template>

<script>
  import UserInfo from '../../components/user/UserInfo'
  import Stats from '../../components/user/Stats'
  import ProfileOptions from '../../components/user/ProfileOptions'

  export default {
    layout: "user",
    name: 'Profile',
    middleware: 'loggedin',
    components: {
      ProfileOptions,
      Stats, UserInfo
    }
  }
</script>

