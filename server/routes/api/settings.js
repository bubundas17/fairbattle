const express = require('express')
const admin = require('../../controllers/admin')
const router = express.Router()
const config = require('../../config')
const Settings = require("../../models/Settings")

router.get('/', admin, async (req, res) => {
  try {
    let settings = await Settings.find()
    res.send({ success: true, settings: settings })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.put('/', admin, async (req, res) => {
  try {
    let {key, value, meta} = req.body
    let settings = await Settings.findOneAndUpdate({key: key}, {$set: {key, value, meta}}, {upsert: true, new: true})
    res.send({ success: true, message: "Data Successfully Updates", data : settings })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.get('/:ver', admin, async (req, res) => {
  try {
    let settings = await Settings.findOne({key: req.params.ver})
    res.send({ success: true, settings: settings })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})

router.put('/:ver', admin, async (req, res) => {
  let body = req.body;
  try {
    delete body.key;
    let settings = await Settings.findOneAndUpdate({key: req.params.ver}, {$set: body}, {upsert: true, new: true})
    res.send({ success: true, settings: settings })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: 'Something Went Wrong' })
  }
})



module.exports = router
