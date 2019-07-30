let mongoose = require('mongoose')

let Schema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", index: 1, required: true},
  title: { type: String, index: 1 },
  txn: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', index: 1, required: true },
  note: { type: String },
  coins: { type: Number },
  date: {type: Date, default: Date.now()},
  status: {type: Number, default: 1}, // 1 for Pending 2 for Sucess, 3 for Failed, 4 Cancelled
  fields: [
    { label: String, value: String }
  ]
})

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Redeem', Schema)
