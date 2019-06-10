<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title><h1 class="headline">Create A Tournament</h1></v-card-title>
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
                <v-textarea v-model="roomInfo" :rows="1" class="ma-2" label="Room Info" ></v-textarea>
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
            <v-btn outline color="teal" @click="create">Create</v-btn>
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
    data() {
      return {
        name: '',
        loading: false,
        date: null,
        description: '',
        isPaid: true,
        showRoomInfo: false,
        roomInfo: "",
        wining: 0,
        teamList: ['SOLO', 'DUO', 'SQUAD'],
        typeList: ['FPP', 'TPP'],
        mapList: ['Erangel', 'Miramar', 'Sanhok', 'Vikendi'],
        statusList: [
          {value: 1, text: "Upcoming"},
          {value: 2, text: "Running"},
          {value: 3, text: "Completed"},
          {value: 4, text: "Cancelled"},
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
      async create() {
        this.loading = true
        try {
          await this.$axios.$post('/matches', {
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
            maxPlayers: this.maxPlayers
          })
          this.showAlert('success', 'Match Created')
        } catch (e) {
          console.log(e)
          this.showAlert('error', 'Error In Creating Match.')
        }
        this.loading = false
      }
    },
    components: {
      Datetime
    },
    mounted() {
      this.date = moment(new Date()).toISOString()
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
