<template>
    <v-layout class="px-5 bars">
        <v-flex xs4 >
            <v-card class="mx-1 green darken-2 elevation-4" dark>
                <v-card-text class="px-1 text-xs-center">
                    MONEY <br> ₹{{ user.credits }}
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs4 d-flex>
            <v-card class="mx-1 red darken-2" dark>
                <v-card-text class="px-1 text-xs-center">
                    KILLS <br/> {{ user.kills }}
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs4 d-flex>
            <v-card class="mx-1 blue darken-2 justify-center align-center" dark>
                <v-card-text class="px-1 text-xs-center">
                    <span>EARNED <br/>
                        ₹{{ user.earned }}
                    </span>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
    export default {
        name: 'Stats'
    }
</script>
<style scoped>
    .bars {
        position: relative;
        top: -25px;
    }
</style>