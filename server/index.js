const config = require("./config")
const express = require('express')
const consola = require('consola')
const mongoose = require("mongoose")
const { Nuxt, Builder } = require('nuxt')
const app = express()
const routes = require("./routes")
const bodyParser = require('body-parser')
const cors = require('cors')

// Import and Set Nuxt.js options
let NuxtConfig = require('../nuxt.config.js')
NuxtConfig.dev = !(process.env.NODE_ENV === 'production')


mongoose.connect(config.db.uri).then(conn => {
  console.log("Connected To Mongo DB")
  start()
}).catch(err => {
  console.log("Failed To Connect To MongoDB");
  console.log(err)
});


async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(NuxtConfig)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (NuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(bodyParser.json())
  app.use(cors())
  app.use(bodyParser.urlencoded())
  app.use(routes)
  app.use(nuxt.render)
  app.use("/admin", (req, res, next) => {
    res.spa = true
    next(req, res, next)
  })
  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
