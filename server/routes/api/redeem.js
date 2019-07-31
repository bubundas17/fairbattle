const config = require('../../config')
const express = require('express')
const authenticated = require('../../controllers/authenticated')
const admin = require('../../controllers/admin')
const router = express.Router()
const UserDB = require('../../models/User')
const RedeemMethods = require('../../models/RedeemMethods')
const Redeem = require('../../models/Redeem')
const libTransition = require('../../lib/libTransactions')
const Razorpay = require('../../lib/librazorpay')


router.get('/requests', admin, async (req, res) => {
  let status = req.query.status
  try {
    let requests = null
    if (status) {
      requests = await Redeem.find({ status }).populate("user", "username phone credits")
    } else {
      requests = await Redeem.find().populate("user", "username phone credits")
    }
    res.send({ requests })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something went wrong' })
  }
})

router.put('/requests/:id', admin, async (req, res) => {
  let id = req.params.id
  let body = req.body
  try {
    let request = await Redeem.findByIdAndUpdate(id, { $set: body })
    res.send({ request })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something went wrong' })
  }
})


router.get('/', authenticated, async (req, res) => {
  let Methods = await RedeemMethods.find()
  res.send({ methods: Methods })
})

router.get('/:id', authenticated, async (req, res) => {
  try {
    let method = await RedeemMethods.findById(req.params.id)
    res.send({ method })
  } catch (e) {
    res.status(400).send({ message: 'Something Went Wrong.' })
  }

})

router.post('/:id/buy', authenticated, async (req, res) => {
  let body = req.body
  // console.log(body)
  let user = req.user
  let method = await RedeemMethods.findById(req.params.id)
  if (!body.fields || !(typeof body.fields == 'object') || !body.fields.length) return res.status(400).send({ message: 'Validation Failed' })
  for (i in method.fields) {
    if (method.fields[i].validator) {
      let regex = new RegExp(method.fields[i].validator)
      if (!regex.test(body.fields[i].value)) return res.status(400).send({ message: 'Validation Failed' })
    }
  }
  // It should be all validated by now.

  let fields = body.fields.map((value, index) => {

    return {
      label: method.fields[index].label,
      value: body.fields[index].value
    }
  })
  // console.log(fields)

  libTransition.create(user.id, -Number(method.cost), 'Redeem FC', `Redeem via ${method.title}`)
    .then(async transaction => {
      // If successful get the transaction id.
      await Redeem.create({
        user: user.id,
        title: method.title,
        coins: method.cost,
        fields: fields,
        txn: transaction
      })
      res.send({ message: 'Your Redeem Request Received.' })
    })
    .catch(error => {
      console.warn(error)
      res.status(400).send({ message: 'Sorry, You Don\'t have enough credits' })
    })

  // res.send({ method })
})


router.post('/', admin, async (req, res) => {
  let body = req.body
  try {
    let method = await RedeemMethods.create(body)
    res.send({ method })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something went wrong' })
  }
})

router.delete('/:id', admin, async (req, res) => {
  try {
    let method = await RedeemMethods.findOneAndRemove({ _id: req.params.id })
    res.send({ message: 'Successfully Deleted', method })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something went wrong' })
  }
})

router.put('/:id', admin, async (req, res) => {
  let body = req.body
  delete body._id
  try {
    let method = await RedeemMethods.findByIdAndUpdate(req.params.id, { $set: body })
    res.send({ method })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something went wrong' })
  }
})


module.exports = router
