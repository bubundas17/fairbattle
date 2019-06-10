const express = require('express')
const authenticated = require('../../controllers/authenticated')
const router = express.Router()
const config = require('../../config')
const UserDB = require("../../models/User")

router.get('/', authenticated, async (req, res) => {
  try {
    let User = await req.userDoc().lean()
    let leaderboard = await UserDB.find({}).sort({"referral.totalReferCredit": -1}).select("referral username").limit(50)

    res.send({
      leaderboard,
      totalReferred: User.referral.totalReferred || 0,
      totalCompletedRefer: User.referral.totalCompletedRefer || 0,
      totalReferCredit: User.referral.totalReferCredit || 0,
      canRefer: User.permissions.canRefer,
      perRefer: User.referral.perRefer || config.refer.PER_REFER,
      newUserCredit: config.refer.NEW_USER_REFER_CREDIT
    })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

module.exports = router
