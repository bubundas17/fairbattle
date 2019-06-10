let rp = require('request-promise')
let config = require('../config')

class Obligr {
  constructor(senderId, auth) {
    this.senderId = senderId
    this.auth = auth
  }

  sendSMS(numbers, text, senderID) {
    let numb = numbers.join(',')
    return new Promise((resolve, reject) => {
      rp.post('https://obligr.io/api_v2/message/send', {
        headers: {
          Authorization: `Bearer ${this.auth}`
        },
        form: {
          sender_id: senderID || this.senderId,
          message: text,
          mobile_no: numb
        }
      }).then( data => {
        resolve(data)
      })
        .catch( error => {
          reject(error)
        })
    })
  }
}

module.exports = new Obligr(config.obligr.senderId, config.obligr.auth)
