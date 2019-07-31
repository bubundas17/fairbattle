const express = require('express')
const authenticated = require('../../controllers/authenticated')
const router = express.Router()
const config = require('../../config')
const UserDB = require("../../models/User")

router.get('/', authenticated, async (req, res) => {
  try {
    let User = await req.userDoc().lean()
    let leaderboard =  UserDB.find({}).sort({"referral.totalReferCredit": -1}).select("referral username").limit(50)
    let totalReferred =  UserDB.find({"referral.referredBy": req.user.id}).count()
    let totalCompletedRefer =  UserDB.find({"referral.referredBy": req.user.id, "referral.referCredited": true}).sort({"referral.totalReferCredit": -1}).count()
    leaderboard =  await leaderboard
    totalReferred =  await totalReferred
    totalCompletedRefer =  await totalCompletedRefer


    res.send({
      leaderboard,
      totalReferred: totalReferred || 0,
      totalCompletedRefer: totalCompletedRefer || 0,
      totalReferCredit: User.referral.totalReferCredit || 0,
      canRefer: User.canRefer,
      perRefer: User.referral.perRefer || config.refer.PER_REFER,
      newUserCredit: config.refer.NEW_USER_REFER_CREDIT
    })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

module.exports = router
