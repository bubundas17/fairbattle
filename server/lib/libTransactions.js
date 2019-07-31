let User = require('../models/User')
let Transitions = require('../models/Transactions')

module.exports = {
  create(UserId, amount, title, note, status = 1, now = true) {
    return new Promise(async (resolve, reject) => {
      if (!UserId) return reject('User Id Is required!')
      if (!title) return reject('Title Is required!')
      if (!amount) return reject('Amount is required')
      if (!status) return reject('Status is required')
      try {
        let user = await User.findById(UserId)
        if (!user) return reject('User Not Found.')
        if (now) {
          if ((amount < 0) && !(user.credits >= Math.abs(Number(amount)))) return reject('User Do not have enough credits!')
          user.credits += Number(amount)
          user.save()
        }
        let transition = await Transitions.create({
          title: title,
          user: UserId,
          amount,
          status: status,
          note: note
        })
        resolve(transition)
      } catch (e) {
        reject(e)
      }
    })
  },
  refund(transitionId, now = true, note) {
    return new Promise((resolve, reject) => {

    })
  }
}

