const config = require('../../config')
const express = require('express')
const authenticated = require('../../controllers/authenticated')
const router = express.Router()
// const UserDB = require('../../models/User')
const Purchase = require('../../models/Purchase')

const Transition = require('../../lib/libTransactions')
const Razorpay = require('../../lib/librazorpay')


router.post('/razorpay/capture', authenticated, async (req, res) => {
  let amount = Number(req.body.amount);
  let paymentId = req.body.paymentId;
  let user = req.body.userId;
  let offerId  = req.body.offerId
  console.log(req.body)
  try {
    let offer = await Purchase.findById(offerId)
    if( offer.inr !== amount) throw new Error("Offer Amount Dont Match The Txn Amount.")
    let payment = await Razorpay.payments.capture(paymentId, amount * 100, 'INR')
    await Transition.create(user, offer.credit, `Purchase of ${offer.credit}FC via ${payment.method}`, `Purchase of ${offer.credit} FC, for Rs. ${amount}/- via ${payment.method}. #RP_${payment.id}`)
    res.send({ message: 'Payment Success!' })
    console.log(payment)
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Is Wrong!' })
  }
})


module.exports = router
