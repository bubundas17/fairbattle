require('dotenv').config()
module.exports = {
  jwtSecret: process.env.JWT_SECRET || "hsadgudshjgfdsjghdfjhgdfshjgdfghjsd",
  obligr: {
    senderId: process.env.SMS_SENDER_ID || "ETRNMT",
    auth: process.env.OBLIGR_AUTH
  },
  db: {
    uri: process.env.MONGO_DB_URI || 'mongodb://localhost/etournaments'
  },
  paytm: {
    mid: process.env.PAYTM_MID,
    key: process.env.PAYTM_MERCHANT_KEY
  },
  refer: {
    PER_REFER: 10, // Default value per refer
    NEW_USER_REFER_CREDIT: 5 // Amount To be credited to new user if signed up via promo link.
  }
}
