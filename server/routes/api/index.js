const express = require('express')
const router = express.Router()

const auth = require("./auth")
const users = require("./users")
const match = require("./match")
const transitions = require("./transitions")
const refer = require("./refer")

router.use("/auth", auth)
router.use("/users", users)
router.use("/matches", match)
router.use("/transitions", transitions)
router.use("/refer", refer)

module.exports = router
