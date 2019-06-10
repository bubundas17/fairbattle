const express = require('express')
const Transitions = require('../../models/Transitions')
const authenticated = require('../../controllers/authenticated')
const router = express.Router()

router.get('/', authenticated, async (req, res) => {
  let user = req.user.id
  try {
    let transitions = await Transitions.find({ user: user }).sort({ date: -1 })
    res.send({ transitions })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

module.exports = router
