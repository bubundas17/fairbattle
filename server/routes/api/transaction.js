const express = require('express')
const Transactions = require('../../models/Transactions')
const libTransactions = require('../../lib/libTransactions')
const authenticated = require('../../controllers/authenticated')
const admin = require('../../controllers/admin')
const router = express.Router()
const validator = require('validator')


router.get('/', authenticated, async (req, res) => {
  let user = req.user.id
  let limit = 50
  let skip = req.query.skip | 0
  try {
    let transactions = await Transactions.find({ user: user }).sort({ date: -1 }).limit(limit).skip(skip)
    res.send({ transactions })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.post('/', admin, async (req, res) => {
  let user = req.body.user
  let title = req.body.title
  let note = req.body.note
  let amount = req.body.amount
  let status = req.body.status || 1
  let now = req.body.now || true

  try {
    await libTransactions.create(user, amount, title, note, status, now)
    res.send({ message: 'success' })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.get('/all', admin, async (req, res) => {
  let limit = 50
  let skip = req.query.skip | 0
  let status = req.query.status

  try {
    let transactions = await Transactions.find({ status: status }).sort({ date: -1 }).limit(limit).skip(skip).populate('user', 'username name _id kills')
    res.send({ transactions })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.get('/:id', admin, async (req, res) => {
  let id = req.params.id

  try {
    let transaction = await Transactions.findById(id)
    res.send({ transaction })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.put('/:id', admin, async (req, res) => {
  let id = req.params.id
  let body = req.body
  try {
    let transaction = await Transactions.findByIdAndUpdate(id, { $set: body })
    res.send({ message: 'success' })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})


router.post('/withdrawal', authenticated, async (req, res) => {
  let user = req.user.id
  let upiRegex = /[a-zA-Z0-9\.\-]{2,256}\@[a-zA-Z][a-zA-Z]{2,64}/
  let { method, upi, paytm, amount } = req.body

  if (!method) return res.status(400).json({ message: 'Please Enter Valid Withdrawal Method' })

  if (!amount || !Number(amount)) return res.status(400).json({ message: 'Please Enter Amount' })
  let txn = {
    user: user,
    amount: -Math.abs(Number(amount)),
    status: 2
  }

  if (method === 'UPI') {
    // Withdrawal Req by UPI
    if (!upi || !upiRegex.test(upi)) return res.status(400).json({ message: 'Please Enter Valid UPI ID' })
    txn.note = `Withdrawal of ${amount} via UPI to ${upi}`

  } else if (method === 'PayTm') {
    // Withdrawal Req by PayTm
    if (!paytm || !validator.isMobilePhone(paytm.toString(), ['en-IN'])) return res.status(400).json({ message: 'Please Enter Valid PayTm Number' })
    txn.note = `Withdrawal of ${amount} via PayTm to ${paytm}`

  } else {
    // Withdrawal Method not Specified.
    if (!method) return res.status(400).json({ message: 'Please Enter Valid Withdrawal Method' })
  }

  try {
    await libTransactions.create(txn.user, txn.amount, `Withdrawal of ₹${amount}`, txn.note, txn.status)
    res.json({ message: 'Your Withdrawal Request Received!' })

  } catch (e) {
    res.status(400).json({ message: 'You Do Not Have Enough Credits!' })
  }

})


module.exports = router
