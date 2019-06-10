<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg4 md6 d-flex>
        <v-card class="ma-2">
          <v-card-title>Edit User Info</v-card-title>
          <v-card-text>
            <form action="">
              <v-text-field v-model="name" label="User Name"></v-text-field>
              <v-text-field v-model="username" label="username"></v-text-field>
              <v-text-field v-model="email" label="Email"></v-text-field>
              <v-text-field v-model="phone" label="Phone" type="number"></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="teal white--text" @click="saveInfo">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 lg4 md6 d-flex>
        <v-card class="ma-2">
          <v-card-title>Edit Scores</v-card-title>
          <v-card-text>
            <form action="">
              <v-text-field v-model="credits" label="Credits" type="number"></v-text-field>
              <v-text-field v-model="kills" label="Kills" type="number"></v-text-field>
              <v-text-field v-model="earned" label="Earned" type="number"></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="teal white--text" @click="saveScores">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 lg4 md6 d-flex>
        <v-card class="ma-2">
          <v-card-title>Other</v-card-title>
          <v-card-text>
            <form action="">
              <v-checkbox
                v-model="banned"
                label="User Banned?"
              ></v-checkbox>
              <v-checkbox
                v-model="canrefer"
                label="Can Refer?"
              ></v-checkbox>
              <v-checkbox
                v-model="admin"
                label="Is this User A Admin?"
              ></v-checkbox>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="teal white--text" @click="savePermissions">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 lg4 md6 d-flex>
        <v-card class="ma-2">
          <v-card-title>Edit Password</v-card-title>
          <v-card-text>
            <form action="">
              <v-text-field v-model="newPassword" label="NEW Password"></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="teal white--text" @click="savePassword">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 lg4 md6 d-flex>
        <v-card class="ma-2">
          <v-card-title>Do Transactions</v-card-title>
          <v-card-text>
            <form action="">
              <v-text-field v-model="transaction" label="Enter Amount"></v-text-field>
              <v-text-field v-model="transactionTitle" label="Transaction Title"></v-text-field>
              <v-text-field v-model="transactionNote" label="Transaction Note (OPTIONAL)"></v-text-field>
            </form>
          </v-card-text>
          <v-spacer/>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="teal white--text" @click="doTransation">Do Txn</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 lg4 md6 d-flex>
        <v-card class="ma-2">
          <v-card-title>Send SMS Notification</v-card-title>
          <v-card-text>
            <form action="">
              <v-textarea label="SMS Contents" v-model="smscontents"></v-textarea>
              <p>SMS Count: {{ smscontents | countSMS}} </p>
            </form>
          </v-card-text>
          <v-spacer/>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="teal white--text" @click="sendSms">SEND SMS</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>


    </v-layout>


  </v-container>

</template>

<script>
  export default {
    layout: 'admin',
    async asyncData({ app, route }) {
      let user = (await app.$axios.$get('/users/' + route.params.id)).user
      return {
        user
      }
    },
    data() {
      return {
        smscontents: '',
        name: null,
        username: null,
        credits: null,
        kills: null,
        earned: null,
        email: null,
        phone: null,
        newPassword: null,
        banned: null,
        admin: null,
        canrefer: null,
        transaction: null,
        transactionNote: null,
        transactionTitle: null
      }
    },
    methods: {
      async saveInfo() {
        try {
          await this.$axios.$put('/users/' + this.$route.params.id, {
            name: this.name,
            username: this.username,
            email: this.email,
            phone: this.phone
          })
          this.showAlert('success', 'User Profile Info Saved!')
        } catch (e) {
          this.showAlert('error', 'Error In changing Profile Info')
        }
      },
      async saveScores() {
        try {
          await this.$axios.$put('/users/' + this.$route.params.id, {
            credits: this.credits,
            kills: this.kills,
            earned: this.earned
          })
          this.showAlert('success', 'User Scores Saved!')
        } catch (e) {
          this.showAlert('error', 'Error In changing Scores Info')
        }
      },
      async sendSms() {
        this.$axios.$post('/users/' + this.$route.params.id + '/sendsms', {
          sms: this.smscontents
        }).then(data => {
          this.smscontents = ''
          this.showAlert('success', 'Sms Sent!')
        }).catch(err => {
          this.showAlert('error', 'Error In sending sms.')
        })
      },


      savePassword() {
        this.$axios.$post('/users/' + this.$route.params.id + '/changepass', {
          password: this.newPassword
        }).then(data => {
          this.newPassword = ''
          this.showAlert('success', 'New Password Saved')
        }).catch(err => {
          this.showAlert('error', 'Error In Saving New Password.')
        })
      },

      doTransation() {
        this.$axios.$post('/users/' + this.$route.params.id + '/dotxn', {
          amount: this.transaction,
          title: this.transactionTitle,
          note: this.transactionNote
        }).then(data => {
          this.transaction = null
          this.transactionTitle = null
          this.transactionNote = null
          this.showAlert('success', 'Transaction Done!')
        }).catch(err => {
          this.showAlert('error', 'Error In Saving New Password.')
        })
      },


      async savePermissions() {
        try {
          await this.$axios.$put('/users/' + this.$route.params.id, {
            admin: this.admin,
            banned: this.banned,
            canRefer: this.canRefer
          })
          this.showAlert('success', 'User Permissions Saved!')
        } catch (e) {
          this.showAlert('error', 'Error In changing Permissions Info')
        }
      }
    },

    mounted() {
      let { name, username, email, phone, kills, earned, admin, banned, canRefer, credits } = this.user
      this.name = name
      this.username = username
      this.email = email
      this.phone = phone
      this.kills = kills
      this.earned = earned
      this.admin = admin
      this.banned = banned
      this.canRefer = canRefer
      this.credits = credits
    }
  }
</script>

<style scoped>

</style>
