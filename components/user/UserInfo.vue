<template>
    <v-layout class="user-back">
        <v-layout class="mt-3 userinfo">
            <v-flex xs3 layout justify-center align-center>
                <v-avatar
                        :size="50"
                        color="grey lighten-4"
                >
                    <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
                </v-avatar>

            </v-flex>
            <v-flex xs9>
                <h1 class="body-2 white--text mt-4">Username {{ user.name }}</h1>
                <h2 class="body-1 mt-1 white--text">{{ user.email }}</h2>
            </v-flex>
        </v-layout>
    </v-layout>

</template>
<script>
    export default {
        name: 'UserInfo',
        computed: {
        }
    }
</script>
<style scoped>
    .userinfo{
        height: 100px;
        margin-top: 80px;
        margin-bottom: 30px;
    }
    .user-back{
        background: #2c3e50;
    }
</style>