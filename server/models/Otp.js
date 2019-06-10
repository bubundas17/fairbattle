let mongoose = require('mongoose');

let Schema = mongoose.Schema({
  phone: {type: Number, index: 1},
  otp: {type: Number}
});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Otp', Schema);
