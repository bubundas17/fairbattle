<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title><h1 class="headline">Edit A Tournament</h1></v-card-title>
          <v-card-text>
            <v-text-field label="Tournament Name" v-model="name"></v-text-field>
            <!--            <v-textarea label="Match Description"></v-textarea>-->
            <p class="body-2 my-2">Description</p>
            <no-ssr>
              <v-editor-app v-model="description"></v-editor-app>
            </no-ssr>

            <p class="body-2 mt-5 ">Select Date And Time</p>
            <div class="date-Picker">
              <datetime type="datetime" v-model="date" use12-hour label="Time And Date"></datetime>
            </div>
            <p class="body-2 mt-5 ">More Settings</p>
            <v-layout row wrap class="m1-5">
              <v-flex xs12 sm6 md4 lg3>
                <v-checkbox v-model="isPaid" class="ma-2" label="Is Paid Match?"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm6 md4 lg3>
                <v-checkbox v-model="showRoomInfo" class="ma-2" label="Show Room Info To Joined users?"></v-checkbox>
              </v-flex>

              <v-flex xs12 sm6 md4 lg3>
                <v-select
                  class="ma-2"
                  :items="statusList"
                  v-model="status"
                  item-text="text"
                  item-value="value"
                  label="Status"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4 lg3>
                <v-textarea v-model="roomInfo" :rows="1" class="ma-2" label="Room Info"></v-textarea>
              </v-flex>
              <v-flex xs12 sm6 md4 lg3>
                <v-text-field v-model="entryFees" :disabled="!isPaid" class="ma-2" label="Entry Fees"
                              type="number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 lg3>
                <v-text-field v-model="perKill" class="ma-2" label="Per Kill" type="number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 lg3>
                <v-text-field v-model="wining" class="ma-2" label="Match Wining Prize" type="number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 lg3>
                <v-text-field v-model="winingCredits" class="ma-2" label="Win Credits Amount"
                              type="number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 lg3>
                <v-text-field v-model="maxPlayers" class="ma-2" label="Max Players" type="number"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4 lg3>
                <v-select
                  class="ma-2"
                  :items="teamList"
                  v-model="team"
                  label="TEAM"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4 lg3>
                <v-select
                  class="ma-2"
                  :items="typeList"
                  v-model="type"
                  label="TYPE"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4 lg3>
                <v-select
                  class="ma-2"
                  :items="mapList"
                  v-model="map"
                  label="MAP"
                ></v-select>
              </v-flex>

            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn outline color="green" @click="sendSmsNotificatopns">Save and Send Room Id</v-btn>
            <v-btn outline color="teal" @click="saveInfo">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="my-3">
          <v-card-title>Actions</v-card-title>
          <v-card-actions>
            <v-spacer/>
            <v-btn outline color="orange 7" @click="sendSmsNotificatopns">Send Starting Reminder</v-btn>
            <v-btn outline color="red">Cancel Match and refund</v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="my-3">
          <v-card-title>Calculate Prizes</v-card-title>
          <v-card-text>
            <v-text-field label="Per Kill" v-model="calculatePerKill"></v-text-field>
            <v-text-field label="Wining" v-model="calculateWining"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn outline color="orange" @click="calculatePrizes">Calculate Prize</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="my-3">
          <v-card-title><span>Joined Users</span> <v-spacer/> Rs. {{ totalCredit }}/-</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <template v-for="participate of participated">
                <v-flex xs12 :key="participate._id">
                  <v-layout row wrap>
                    <v-flex xs2>
                      {{ participate.user.username }}
                    </v-flex>

                    <v-flex xs2>
                      <v-text-field v-model="participate.pubgUsername" label="pubg username" class="mx-1"/>
                    </v-flex>

                    <v-flex xs2>
                      <v-text-field v-model="participate.kills" label="Kills" class="mx-1"/>
                    </v-flex>

                    <v-flex xs2>
                      <v-checkbox v-model="participate.won" label="Wining Player?" class="mx-1"/>
                    </v-flex>

                    <v-flex xs2>
                      <v-checkbox v-model="participate.credited" label="Wining Prize Credited?" class="mx-1"/>
                    </v-flex>

                    <v-flex xs2>
                      <v-text-field v-model="participate.prize" label="Prize To be Credited" type="number"
                                    class="mx-1"/>
                    </v-flex>



                  </v-layout>
                </v-flex>
              </template>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn outline color="teal" @click="doCredits">Do Credits</v-btn>
            <v-btn outline color="teal" @click="savePlayers">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>


    </v-layout>
  </v-container>
</template>
<script>

  import { Datetime } from 'vue-datetime'
  import moment from 'moment'

  export default {
    layout: 'admin',
    async asyncData({ app, route }) {
      let match = await app.$axios.$get('/matches/' + route.params.id)
      let matchData = match.match
      return {
        match: matchData
      }
    },
    data() {
      return {
        participated: [],

        calculatePerKill: 0,
        calculateWining: 0,

        name: '',
        loading: false,
        date: null,
        description: '',
        isPaid: true,
        showRoomInfo: false,
        roomInfo: '',
        wining: 0,
        teamList: ['SOLO', 'DUO', 'SQUAD'],
        typeList: ['FPP', 'TPP'],
        mapList: ['Erangel', 'Miramar', 'Sanhok', 'Vikendi'],
        statusList: [
          { value: 1, text: 'Upcoming' },
          { value: 2, text: 'Running' },
          { value: 3, text: 'Completed' },
          { value: 4, text: 'Cancelled' }
        ],
        status: 1,
        perKill: 0,
        entryFees: 0,
        maxPlayers: 100,
        team: 'SOLO',
        type: 'TPP',
        map: 'Erangel',
        winingCredits: 0
      }
    },

    methods: {
      async saveInfo() {
        this.loading = true
        try {
          await this.$axios.$put('/matches/' + this.$route.params.id, {
            name: this.name,
            isPaid: this.isPaid,
            wining: this.wining,
            description: this.description,
            perKill: this.perKill,
            entryFees: this.entryFees,
            winingCredits: this.winingCredits,
            team: this.team,
            type: this.type,
            map: this.map,
            date: this.date,
            maxPlayers: this.maxPlayers,
            status: this.status,
            showRoomInfo: this.showRoomInfo,
            roomInfo: this.roomInfo
          })
          this.showAlert('success', 'Match Edited')
        } catch (e) {
          console.log(e)
          this.showAlert('error', 'Error In Creating Match.')
        }
        this.loading = false
      },
      async savePlayers(){
        this.loading = true
        try {
          await this.$axios.$put('/matches/' + this.$route.params.id, {
            participated: this.participated
          })
          this.showAlert('success', 'Match Edited')
        } catch (e) {
          console.log(e)
          this.showAlert('error', 'Error In Creating Match.')
        }
        this.loading = false
      },
      async doCredits(){
        await this.$axios.$post('/matches/' + this.$route.params.id  + "/docredits")
        this.showAlert("success", "Sms Notifications sent!")
      },
      async sendSmsNotificatopns(){
        await this.saveInfo()
        await this.$axios.$post('/matches/' + this.$route.params.id  + "/sendnotificationsms")
        this.showAlert("success", "Sms Notifications sent!")
      },

      async calculatePrizes() {
        let totalWinners = 0
        this.participated.map(data => data.won? totalWinners ++ : false)

        this.participated = this.participated.map(data => {
          return {
            ...data,
            prize: (data.kills * this.calculatePerKill) + (data.won ? Math.floor(this.calculateWining/totalWinners) : 0)
          }
        })
        this.showAlert("success", "Prize Calculated")
      }
    },
    components: {
      Datetime
    },
    computed: {
      totalCredit(){
        let totalCredit = 0
        this.participated.map(data => totalCredit += Number(data.prize))
        return totalCredit;
      }
    },
    mounted() {
      this.name = this.match.name
      this.description = this.match.description
      this.isPaid = this.match.isPaid
      this.entryFees = this.match.entryFees
      this.perKill = this.match.perKill
      this.wining = this.match.wining
      this.calculatePerKill = this.match.perKill
      this.calculateWining = this.match.wining
      this.winingCredits = this.match.winingCredits
      this.team = this.match.team
      this.type = this.match.type
      this.map = this.match.map
      this.date = moment(this.match.date).toISOString()
      this.status = this.match.status
      this.showRoomInfo = this.match.showRoomInfo
      this.roomInfo = this.match.roomInfo
      this.participated = this.match.participated
    }
  }
</script>
<style>
  .date-Picker {
    color: #333333;
    border: 1px dashed #2c3e50;
  }

  .date-Picker input {
    padding: 10px;
    height: 100%;
    width: 100%;
  }
</style>
