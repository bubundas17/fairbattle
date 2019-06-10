let mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

let Schema = mongoose.Schema({
  name: { type: String, index: 1 },
  count: { type: Number, index: 1 },
  isPaid: { type: Boolean, default: true }, // true For paid and false for Free
  wining: { type: Number },
  description: { type: String },
  perKill: { type: Number },
  entryFees: { type: Number },
  status: { type: Number, default: 1 },  // 1 for upcoming, 2 for ongoing, 3 For Completed, 4 For Cancelled
  winingCredits: { type: Number },
  team: { type: String },
  type: { type: String },
  map: { type: String },
  date: { type: Date, required: true },
  maxPlayers: { type: Number, default: 100 },
  joined: { type: Number, default: 0 },
  showRoomInfo: {type: Boolean, default: false},
  roomInfo: {type: String},
  participated: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: 1, required: true },
      transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', index: 1, required: true },
      winingTransaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', index: 1 },
      pubgUsername: { type: String, required: true },
      kills: { type: Number, default: 0},
      won: { type: Boolean, default: false },
      prize: { type: Number, default: 0 },
      credited: { type: Boolean, default: false }
    }
  ]
})

Schema.plugin(AutoIncrement, { inc_field: 'count' })
// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Match', Schema)
