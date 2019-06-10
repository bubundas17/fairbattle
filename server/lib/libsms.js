let obligr = require('./obligr')

module.exports = {
  sendSMS: (numbers, text, senderID) => {
    return obligr.sendSMS(numbers, text, senderID)
  }
}

