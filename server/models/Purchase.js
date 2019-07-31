let mongoose = require('mongoose');

let Schema = mongoose.Schema({
  title: {type: String, index: 1},
  description: {type: String},
  credit: {type: Number},
  inr: {type: Number}
});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Purchase', Schema);
