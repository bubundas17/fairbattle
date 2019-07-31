let mongoose = require('mongoose');

let Schema = mongoose.Schema({
  uuid: {type: String, unique: true},
  created: {type: Date, default: Date.now()}
});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('DeviceId', Schema);
