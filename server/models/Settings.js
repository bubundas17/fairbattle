let mongoose = require('mongoose')

let Schema = mongoose.Schema({
  key: { type: String, index: true, unique: true },
  value: { type: String },
  meta: { type: mongoose.Schema.Types.Mixed }
})

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Settings', Schema)
