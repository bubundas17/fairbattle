let mongoose = require('mongoose')

let Schema = mongoose.Schema({
  username: { type: String, unique: true, index: 1 },
  phone: { type: Number, unique: true, index: 1, required: true },
  email: { type: String, index: 1, required: true },
  name: { type: String },
  credits: { type: Number, default: 0 },
  kills: { type: Number, default: 0 },
  earned: { type: Number, default: 0 },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  banned: { type: Boolean, default: false },
  canRefer: { type: Boolean, default: true },
  referral: {
    totalReferred: { type: Number, default: 0 },   // Total Refereed User
    totalCompletedRefer: { type: Number, default: 0 },  // Completed Referred user
    totalReferCredit: { type: Number, default: 0, index: 1 },   // Credits Earned from referring users
    perRefer: { type: Number },  // Overriding Refer Credits
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: 1 },
    referCredited: { type: Boolean, default: false, index: 1 } // Check if Referral amount credited or not
  },
  created: { type: Date, default: Date.now }
})

Schema.index({username: 'text', email: "text", name: "text", phone: "text"}, { default_language: "none" });
module.exports = mongoose.model('User', Schema)
