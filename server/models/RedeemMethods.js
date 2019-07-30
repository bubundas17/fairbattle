let mongoose = require('mongoose')

let Schema = mongoose.Schema({
  title: { type: String, index: 1 },
  description: { type: String },
  cost: { type: Number },
  fields: [
    { label: String, validator: String, fieldType: String }
  ]

})

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('RedeemMethods', Schema)
