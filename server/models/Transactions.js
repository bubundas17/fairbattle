let mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

let Schema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", index: 1, required: true},
  title: {type: String, required: true},
  amount: {type: Number, index: 1, required: true},
  status: {type: Number, index: 1, required: true}, // 1 for Success, 2 For Processing, 3 For Failed, 4 for Cancelled
  note: {type: String},
  refunded: {type: Boolean, default: false},
  date: {type: Date, default: Date.now(), index: 1}
});

Schema.plugin(AutoIncrement, { inc_field: 'txnId' })
// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Transaction', Schema);
