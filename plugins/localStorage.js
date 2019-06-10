import createPersistedState from 'vuex-persistedstate'

export default ({ store, isClient }, app) => {
  // window.onNuxtReady(() => {
    try {
      createPersistedState({
        key: 'storage',
        paths: [
          'token',
          'loggedIn'
        ]
      })(store)
    } catch (e) {
      // console.log("Local Storage Not Available")
    }


  // })
}
