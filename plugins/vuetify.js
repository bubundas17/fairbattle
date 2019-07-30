import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    nav: "#2c3e50",
    primary: colors.deepPurple,
    accent: "#c51162",
    secondary: colors.deepOrange.darken2,
    info: colors.pink.darken3,
    warning: colors.amber.darken2,
    error: colors.deepOrange.accent4,
    success: colors.indigo
  }
})
