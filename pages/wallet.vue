<template>
    <v-card>
        <v-card-title> Wallet

        </v-card-title>
        <v-tabs v-model="active" centered color="cyan" dark slider-color="yellow">
            <v-tab ripple>Add Money</v-tab>
            <v-tab ripple> Withdrawal</v-tab>
            <v-tab ripple> Transfer</v-tab>

            <v-tab-item>
                <v-card flat>
                    <v-card-title>Add Money To wallet</v-card-title>
                    <v-card-text>
                        <v-layout row>
                            <v-text-field label="Enter Amount" type="number" v-model="rechargeAmount"></v-text-field>
                            <v-btn @click="addMoney" class="teal" dark>Recharge</v-btn>
                        </v-layout>

                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-title>Withdrawal Money</v-card-title>
                    <v-card-text>
                        <v-text-field label="UPI ID" v-model="upi"></v-text-field>
                            <v-text-field label="Amount To Withdraw" type="number" v-model="withdraw"></v-text-field>
                        <p class="body-2">Note: Money Will Be Withdrawn To the UPI ID</p>
                        <p class="body-2">just enter the UPI id from Google Pay or Phonepe app. </p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/><v-btn color="teal" dark @click="withdrawalMoney">Withdraw</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-title>Transfer money to another user</v-card-title>
                    <v-card-text>
                        <v-text-field label="Username" v-model="sendUser"></v-text-field>
                        <v-text-field label="Amount To Transfer" v-model="sendAmount" type="number"></v-text-field>
                        <p class="body-2">Note: Money Will Be Sent to the userid you mentioned above. </p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/><v-btn color="teal" dark>Send</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
    export default {
        name: "Wallet",
        data() {
            return {
                active: null,
                rechargeAmount: 20,
                withdraw: null,
                upi: null,
                sendUser: "",
                sendAmount: null
            }
        },
        methods: {
            addMoney(){
                this.$store.dispatch("addMoney", this.rechargeAmount)
            },
            withdrawalMoney(){
                this.$store.dispatch("withdrawalMoney", {amount: this.withdraw, upi: this.upi})
            }
        }
    }
</script>

<style scoped>

</style>
