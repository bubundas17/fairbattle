export const state = () => ({
  user: {},
  loggedIn: false,
  banned: false,
  token: null,
  transactions: [
    {
      name: 'Wallet TopUp',
      amount: 50,
      status: 3,
      note: null,
      date: new Date()
    }, {
      name: 'Withdrawal',
      amount: -50,
      status: 2,
      note: 'Withdrawal of money to bubundas17@ybl',
      date: new Date()
    },
    {
      name: 'Money Added',
      amount: 300,
      status: 1,
      note: null,
      date: new Date()
    }
  ],
  matches: [
    {
      name: 'Morning Squad',
      index: 1,
      prize: 500,
      prizeLabel: null,
      perKill: 10,
      entry: 20,
      team: 'SOLO',
      type: 'TPP',
      map: 'Erangle',
      maxPlayers: 100,
      joined: 30
    },
    {
      name: 'Morning Squad',
      index: 2,
      prize: 500,
      prizeLabel: null,
      perKill: 10,
      entry: 20,
      team: 'SOLO',
      type: 'TPP',
      map: 'Erangle',
      maxPlayers: 100,
      joined: 100
    },
    {
      name: 'Morning Squad',
      index: 3,
      prize: 500,
      prizeLabel: null,
      perKill: 10,
      entry: 20,
      team: 'SOLO',
      type: 'TPP',
      map: 'Erangle',
      maxPlayers: 100,
      joined: 80
    },
    {
      name: 'Morning Squad',
      index: 4,
      prize: 500,
      prizeLabel: null,
      perKill: 10,
      entry: 20,
      team: 'SOLO',
      type: 'TPP',
      map: 'Erangle',
      maxPlayers: 100,
      joined: 99
    },
    {
      name: 'Morning Squad',
      index: 5,
      prize: 500,
      prizeLabel: null,
      perKill: 10,
      entry: 20,
      team: 'SOLO',
      type: 'TPP',
      map: 'Erangle',
      maxPlayers: 100,
      joined: 95
    },
    {
      name: 'Morning Squad',
      index: 6,
      prize: 500,
      prizeLabel: null,
      perKill: 10,
      entry: 20,
      team: 'SOLO',
      type: 'TPP',
      map: 'Erangle',
      maxPlayers: 100,
      joined: 5
    }
  ]

})

export const mutations = {
  token: (state, payload) =>{
    state.token = payload
  },

  user: (state, payload) => {
    state.user = { ...state.user, ...payload }
  },
  addMoney(state, payload) {
    state.user.credits += parseInt(payload)
  },
  loggedIn(state, payload) {
    state.loggedIn = payload
  },
  addTransaction(state, payload) {
    state.transactions.unshift(payload)
  }
}

export const actions = {
  async nuxtClientInit({ commit, getters }, context) {
    // await new Promise(resolve => setTimeout(() => {resolve()}, 500 ))
    this.$axios.setToken(getters['token'], 'Bearer')
    if (!getters['token']) return
    try {
      let user = await this.$axios.$get('/auth/profile')
      commit('user', user.user)
      commit('loggedIn', true)
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          commit('token', null)
          commit('loggedIn', false)

        }
      }
    }
  },

  async updateProfile({ getters, commit }, payload) {
    return new Promise((resolve, reject) => {
      commit('user', payload)
      setTimeout(() => {
        return resolve()
      }, 500)
    })
  },
  async addMoney({ getters, commit }, payload) {
    commit('addMoney', payload)
    commit('addTransaction', {
      name: 'Added Money',
      status: 1,
      amount: payload,
      note: 'money added via UPI',
      date: new Date()
    })
    return true
  },
  async withdrawalMoney({ getters, commit }, payload) {
    commit('addMoney', -payload.amount)
    commit('addTransaction', {
      name: 'Money withdrawn',
      status: 1,
      amount: -parseInt(payload.amount),
      note: 'money added via UPI, to ' + payload.upi,
      date: new Date()
    })
    return true
  },

  async login({ getters, commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await this.$axios.$post('/auth/login', { ...payload })
        commit('token', user.token)
        this.$axios.setToken(user.token, 'Bearer')
        user = await this.$axios.$get('/auth/profile')
        commit('user', user.user)
        commit('loggedIn', true)
        resolve("User Logged In!")
      } catch (e) {
        console.log(e)
        reject("Invalid Username or Password.")
      }
    })
  },

  logout({ getters, commit }){
    commit("token", null)
    commit('loggedIn', false)
    commit('user', {})
  },

  token({ getters, commit }, payload){
    commit("token", payload)
    this.$axios.setToken(payload, 'Bearer')
  },
  async reloadProfile({ getters, commit }){
    return new Promise(async (resolve, reject) => {
      try {
        let user = await this.$axios.$get('/auth/profile')
        commit('user', user.user)
        commit('loggedIn', true)
        resolve("User Logged In!")
      } catch (e) {
        reject("Please Login First")
      }
    })
  }

}

export const getters = {
  token(state) {
    return state.token
  },
  user: state => {
    return state.user
  },
  matches: state => {
    return state.matches.map((val) => {
      let canJoin = val.joined < val.maxPlayers
      let progress = ((val.joined / val.maxPlayers) * 100)
      return {
        canJoin,
        progress,
        ...val
      }
    })
  },
  transactions: state => {
    return state.transactions.map(data => {
      let statusTxt = null
      let statusColor = null
      switch (data.status) {
        case 1:
          statusTxt = 'SUCCESS'
          statusColor = 'green darken-4'
          break
        case 2:
          statusTxt = 'PROCESSING'
          statusColor = 'yellow darken-4'
          break
        case 3:
          statusTxt = 'FAILED'
          statusColor = 'deep-orange darken-4'
          break
        default:
          statusTxt = 'FAILED'
          statusColor = 'deep-orange darken-4'
          break
      }
      return {
        statusTxt,
        statusColor,
        ...data
      }
    })
  },
  isLoggedIn(state) {
    return state.loggedIn
  }
}


