const express = require('express')
const router = express.Router()
const Settings = require("../../models/Settings")


const auth = require("./auth")
const users = require("./users")
const match = require("./match")
const payments = require("./payments")
const transaction = require("./transaction")
const refer = require("./refer")
const settings = require("./settings")
const redeem = require("./redeem")
const purchase = require("./purchase")

router.get("/", async (req, res) => {
  try {
    let release = await Settings.findOne({key: "app_latest_release"})
    res.send({
      success: true,
      data: {
        release
      }
    })
  } catch (e) {

  }

});

router.use("/auth", auth)
router.use("/users", users)
router.use("/matches", match)
router.use("/settings", settings)
router.use("/payments", payments)
router.use("/transaction", transaction)
router.use("/redeem", redeem)
router.use("/refer", refer)
router.use("/purchase", purchase)

module.exports = router
