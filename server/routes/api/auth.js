const express = require('express')
const validator = require('validator')
const router = express.Router()
const User = require('../../models/User')
const DeviceUUID = require('../../models/DeviceUUIDS')
const Otp = require('../../models/Otp')
const Onligr = require('../../lib/libsms')

const config = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticated = require('../../controllers/authenticated')

router.post('/signup', async (req, res) => {
  let { username, email, name, password, otp, phone, referral, uuid } = req.body

  // Validating
  if (!username) return res.status(400).json({ message: 'Please Enter Username' })
  if (!email || !validator.isEmail(email)) return res.status(400).json({ message: 'Please Enter A Valid Email' })
  if (!name) return res.status(400).json({ message: 'Please Enter Name' })
  if (!password) return res.status(400).json({ message: 'Please Enter Password' })
  if (!otp) return res.status(400).json({ message: 'Please Enter OTP' })
  if (!phone || !validator.isMobilePhone(phone.toString(), ['en-IN'])) return res.status(400).json({ message: 'Please Enter Valid Phone Number' })
  let referedBy = null

  // Referral Logic
  if(uuid){
    try{
      await DeviceUUID.create({uuid: uuid})
      if (referral) {
        referedBy = await User.findOne({ username: referral })
        if (!referedBy) return res.status(400).json({ message: 'Invalid Referral Code.' })
      }
    }catch (e) {

    }
  }


  try {
    let otpcoll = await Otp.findOne({
      phone: phone
    })

    // Checking OTP
    if (!otpcoll || otpcoll.otp != otp) return res.status(400).json({ message: 'Invalid OTP' })

    // Clear Database If done.
    await Otp.deleteMany({
      phone: phone
    })

    let hashedpass = bcrypt.hashSync(password, 10)
    let userData = await User.create({
      username, name, email, phone, password: hashedpass, 'referral.referredBy': referedBy
    })

    let token = jwt.sign({
        id: userData._id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        admin: userData.admin
      },
      config.jwtSecret,
      // { expiresIn: '6h' }
      )

    res.cookie('authorization', 'Bearer ' + token)

    res.send({
      message: 'User SignUp Completed!',
      user: {
        id: userData._id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        admin: userData.admin
      },
      token: token
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Unknown Error' })
  }
})

router.get('/checkAvailability', async (req, res) => {
  let { username, email, phone } = req.query
  if (!(username || email || phone)) return res.status(400).send({
    error: true,
    message: 'One of following fields are required: username, email or phone.'
  })

  let data = await User.findOne(req.query)
  data = !!data
  res.send({
    success: true,
    used: data
  })
})

router.get('/profile', authenticated, async (req, res) => {
  let user = await User.findById(req.user.id).select('-password')
  res.json({ user: user })
})

router.post('/login', async (req, res) => {
  let { username, password } = req.body
  let userData = await User.findOne({
    $or: [
      { username: username },
      { phone: parseInt(username) || '' }
    ]
  })

  if (userData && bcrypt.compareSync(password, userData.password)) {
    let token = jwt.sign({
        id: userData._id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        admin: userData.admin
      },
      config.jwtSecret,
      // { expiresIn: '6h' }
      )

    res.cookie('authorization', 'Bearer ' + token)

    res.json({
      message: 'User Logged In!',
      user: {
        id: userData._id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        admin: userData.admin
      },
      token: token
    })

  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
})

router.post('/requestotp', async (req, res) => {
  let { phone } = req.body
  try {
    await Otp.deleteMany({ phone: phone })
    let newOtp = getRandomArbitrary(10000, 99999)
    await Otp.create({ phone: phone, otp: newOtp })
    await Onligr.sendSMS([phone], `${newOtp} is Your OTP for Fair Battle. Do not Share it with anybody.`)
    res.send({ message: 'Otp Successfully Sent' })
  } catch (e) {
    console.log(e)
    res.status(401).send({ message: 'Error in sending otp' })
  }

})

// router.post("/test",  async (req, res) => {
//   let { phone } = req.body
//   let data = await Otp.findOne({
//     phone
//   })
//   if(data) res.send(data)
//   else res.send({message: "No otp found"})
// })
function getRandomArbitrary(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}

module.exports = router
