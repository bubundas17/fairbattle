const express = require('express')
const router = express.Router()

const auth = require("./auth")
const users = require("./users")
const match = require("./match")
const payments = require("./payments")
const transaction = require("./transaction")
const refer = require("./refer")

router.use("/auth", auth)
router.use("/users", users)
router.use("/matches", match)
router.use("/payments", payments)
router.use("/transaction", transaction)
router.use("/refer", refer)

module.exports = router
