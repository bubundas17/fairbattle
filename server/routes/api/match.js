const express = require('express')
const router = express.Router()
const Match = require('../../models/Match')
const User = require('../../models/User')

const libTransition = require('../../lib/libTransactions')
const authenticated = require('../../controllers/authenticated')
const admin = require('../../controllers/admin')

router.get('/', authenticated, async (req, res) => {
  let status = req.query.status
  let participated = req.query.participated

  try {
    let user = req.user.id
    let matches
    if (status) {
      matches = await Match.find({ status: status })
    } else if (participated) {
      matches = await Match.find({ status: { $in: [1, 2] }, 'participated.user': user })
    } else {
      matches = await Match.find()
    }

    matches = matches.map(data => {
      data = data.toObject()
      let userJoined = !!data.participated.filter(part => String(part.user) === String(user)).length
      return {
        ...data,
        userJoined
      }
    })

    res.send({ matches })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})


router.post('/', admin, async (req, res) => {
  let data = req.body
  try {
    let match = await Match.create(data)
    res.send({ match })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.put('/:id', admin, async (req, res) => {
  let data = req.body
  let id = req.params.id

  try {
    let match = await Match.findByIdAndUpdate(id, { $set: data })
    res.send({ match })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.get('/:id', authenticated, async (req, res) => {
  let id = req.params.id
  let user = req.user

  try {
    let match = await Match.findById(id)
      .populate('participated.user', 'username name _id kills')
    match = match.toObject()
    match.userJoined = !!match.participated.filter(part => String(part.user._id) === String(user.id)).length
    res.send({ match })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.post('/:id/docredits', admin, async (req, res) => {
  let id = req.params.id
  try {
    let match = await Match.findById(id)

    for (participate of match.participated) {
      // console.log(participate)
      // Do nothing Of the process already done.
      if (participate.credited) continue

      try {

        // Updating User's Profile Info.
        await User.findByIdAndUpdate(participate.user, {
          $inc: {
            kills: participate.kills,
            earned: participate.prize
          }
        })

        if (participate.prize) {
          // Do do credits only if the prize is greater than 0
          let txn = await libTransition.create(
            participate.user,
            participate.prize,
            'Wining Of match ' + match.name + ' #' + match.count,
            `Credit for match #${match.count}, Thank you for playing! Here is the credits for ${participate.kills} Kills${participate.won ? ' and Wining The Match!' : ''}.`,
            1,
            true
          )
          participate.winingTransaction = txn
        }
        participate.credited = true
      } catch (e) {
        console.log(e)
      }
    }

    // at least save the match data
    match.save()
    res.send({ match })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.post('/:id/cancel', admin, async (req, res) => {
  let data = req.body
  let id = req.params.id
  try {
    let match = await Match.findByIdAndUpdate(id, { $set: data })
    res.send({ match })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.post('/:id/sendnotification',admin, async (req, res) => {
  let data = req.body
  let id = req.params.id
  try {
    let match = await Match.findByIdAndUpdate(id, { $set: data })
    res.send({ match })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.post('/:id/join', authenticated, async (req, res) => {
  let { pubgUsername } = req.body
  let user = req.user
  let id = req.params.id
  try {
    let match = await Match.findById(id)

    alreadyJoined = match.participated.filter(data => String(data.user) === String(user.id)).length
    pubg = match.participated.filter(data => String(data.pubgUsername) === String(pubgUsername)).length

    if (alreadyJoined) return res.status(400).send({ message: 'You are already in!' })
    if (pubg) return res.status(400).send({ message: 'The PUBG Username is already in!' })
    if (!(match.maxPlayers > match.joined)) return res.status(400).send({ message: 'Match Is Full!' })
    if (match.status !== 1) return res.status(400).send({ message: 'Sorry, You Cannot Join This Match Now.' })
    // if (match.isPaid) {
    // match is paid, Do the Transaction
    libTransition.create(user.id, -Number(match.entryFees), 'Match Joining Fees',`Joining Fees For ${match.name}, #${match.count}`)
      .then(transaction => {
        // If successful get the transaction id.
        match.participated.push({
          user: user.id,
          transaction: transaction,
          pubgUsername: pubgUsername
        })
        match.joined++
        match.save()
        res.send('Thank you for joining this match!')
      })
      .catch(error => {
        console.warn(error)
        res.status(400).send({ message: 'Sorry, You Don\'t have enough credits' })
      })
    // }
    // res.send({ user })
  } catch (e) {
    console.warn(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

module.exports = router
