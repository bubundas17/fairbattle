const User = require('../models/User')
const libTxn = require('./libTransactions')
const config = require('../config')

module.exports = {
  doCredits(user) {
    return new Promise(async (resolve, reject) => {
      User.findById(user).then(async user => {
        if (!user.referral.referredBy) return resolve({ message: 'No Need To credit' })
        if (user.referral.referCredited) return resolve({ message: 'No Need To credit' })
        let refUser = await User.findById(user.referral.referredBy)
        let perRefer = refUser.referral.perRefer || config.refer.PER_REFER
        let newUser = refUser.referral.perRefer || config.refer.NEW_USER_REFER_CREDIT

        if (refUser.canRefer) {
          // Credit for the referral
          await libTxn.create(refUser._id, perRefer, 'Referral Bonus Credited', 'Bonus for referring a new user')
          await User.findByIdAndUpdate(refUser._id, {$inc: {"referral.totalReferCredit": perRefer}})
          await User.findByIdAndUpdate(user._id, {$set: {"referral.referCredited": true}})
          return resolve({ message: 'Referral Credited.' })
          // refUser.referral.totalReferCredit += perRefer
          // user.referral.referCredited = true
        }
      })
    })
  }
}
