const config = require('../../config')
const express = require('express')
const authenticated = require('../../controllers/authenticated')
const admin = require('../../controllers/admin')
const router = express.Router()
const UserDB = require('../../models/User')
const Purchase = require('../../models/Purchase')
const Transition = require('../../lib/libTransactions')
const Razorpay = require('../../lib/librazorpay')


router.get('/', authenticated, async (req, res) => {
  let offers = await Purchase.find()
  res.send({ offers })
})

router.post('/', admin, async (req, res) => {
  let body = req.body
  try {
    let offer = await Purchase.create(body)
    res.send({ offer })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something went wrong' })
  }
})

router.delete('/:id', admin, async (req, res) => {
  try {
    let offer = await Purchase.findOneAndRemove({ _id: req.params.id })
    res.send({ message: 'Successfully Deleted', offer })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something went wrong' })
  }
})

router.put('/:id', admin, async (req, res) => {
  let body = req.body
  delete body._id
  try {
    let offer = await Purchase.findByIdAndUpdate(req.params.id, { $set: body })
    res.send({ offer })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something went wrong' })
  }
})

module.exports = router
