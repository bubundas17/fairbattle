const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const libsms = require('../../lib/libsms')
const libTxn = require('../../lib/libTransactions')
const bcrypt = require('bcryptjs')

// TODO:Implement Authentication


router.get('/', async (req, res) => {
  try {
    let users = await User.find({})
    res.send({ users })
  } catch (e) {
    res.state(400).send({ message: 'Failed To Retrieve Users' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
    res.send({ user })
  } catch (e) {
    res.status(400).send({ message: 'Failed To Retrieve User' })
  }
})

router.put('/:id', async (req, res) => {
  let body = req.body
  try {
    let user = await User.findByIdAndUpdate(req.params.id, { $set: body })
    res.send({ user })
  } catch (e) {
    console.warn(e)
    res.status(400).send({ message: 'Failed To Retrieve User' })
  }
})

router.post('/:id/sendsms', async (req, res) => {
  let body = req.body
  try {
    let user = await User.findById(req.params.id)
    await libsms.sendSMS([user.phone], body.sms)
    res.send({ user })
  } catch (e) {
    console.warn(e)
    res.status(400).send({ message: 'Failed To Send Sms' })
  }
})

router.post('/:id/changepass', async (req, res) => {
  let password = req.body.password
  let hash = bcrypt.hashSync(password, 10)
  try {
    let user = await User.findByIdAndUpdate(req.params.id, { $set: { password: hash } })
    res.send({ user })
  } catch (e) {
    console.warn(e)
    res.status(400).send({ message: 'Failed To Save New Password' })
  }
})

router.post('/:id/dotxn', async (req, res) => {
  let amount = req.body.amount
  let title = req.body.title
  let note = req.body.note
  // let hash = bcrypt.hashSync(password, 10)
  libTxn.create(req.params.id, amount, title, note)
    .then( ok => {
      res.send({message: "OK"})
    })
    .catch( err => {
      console.warn(err)
      res.status(400).send({message: "User Dont have Enough Credits."})
    })
})


module.exports = router
