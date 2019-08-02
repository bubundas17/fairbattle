const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'universal',
  serverMiddleware: [
    '~/server-middleware/disable-ssr'
  ],
  /*
  ** Headers of the page
  */

  head: {
    title: "Fairbattle | Play PUBG and earn Real Money.",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: false,

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/localStorage',
    '@/plugins/vuetify',
    '@/plugins/alerts',
    '@/plugins/filters',
    '@/plugins/mixins',
    '@/plugins/mdi',
    '@/plugins/vee-validate',
    '@/plugins/datetime',
    {src: '@/plugins/yimoeditor', ssr: false},
    '@/plugins/client-init'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    // 'nuxt-client-init-module'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: "http://192.168.31.18:3001/api/",
    browserBaseURL: "/api/"
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
