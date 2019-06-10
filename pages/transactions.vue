<template>
    <v-layout>
        <v-expansion-panel>
            <v-expansion-panel-content dark v-for="transaction in transactions" :key="transaction.name" :class="transaction.statusColor">
                <template v-slot:header>
                    <v-card flat :class="transaction.statusColor" dark><v-card-actions>{{transaction.name}} <v-spacer/> {{ transaction.amount }}</v-card-actions></v-card>

                </template>
                <v-card>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs6>
                                Status: {{ transaction.statusTxt }}
                            </v-flex>
                            <v-flex xs6>
                                Date: {{ transaction.date | formatDate }}
                            </v-flex>
                        </v-layout>
                        <p class="body-2" v-if="transaction.note">
                           More info:
                        </p>
                        <p class="body-1" v-if="transaction.note">{{ transaction.note }}</p>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-layout>
</template>
<script>
    import vuex from "vuex"
    export default {
        data() {
            return {}
        },
        computed: {
            ...vuex.mapGetters(["transactions"])
        }
    }
</script>