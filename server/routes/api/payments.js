const config = require('../../config')
const express = require('express')
const authenticated = require('../../controllers/authenticated')
const router = express.Router()
const UserDB = require("../../models/User")
const Transition = require('../../lib/libTransactions')
const Razorpay = require("../../lib/librazorpay")


router.post("/razorpay/capture", async (req, res) => {
  let amount = req.body.amount;
  let paymentId = req.body.paymentId
  let user = req.body.user;
  // console.log(req.body)
  try {
    let payment = await Razorpay.payments.capture(paymentId, Number(amount)*100, "INR");
    await Transition.create(user, amount, `TopUp Of Rs. ${amount}/- via ${payment.method}`, `Recharge of Rs. ${amount}/- via ${payment.method}. Ref: RP ${payment.id}`)
    res.send({message: "Payment Success!"})
    // console.log(payment)
  } catch (e) {
    console.log(e)
    res.status(400).send({message: "Something Is Wrong!"})
  }
})


module.exports = router
