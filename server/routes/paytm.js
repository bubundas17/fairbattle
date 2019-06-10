const express = require('express')
const router = express.Router()
let libpaytm = require('../lib/libpaytm')
let config = require("../config")

router.post('/generate_checksum', async (request, response) => {
  var paramarray = {}
  paramarray['MID'] = 'xxxxxxxxxxxxxx' //Provided by Paytm
  paramarray['ORDER_ID'] = 'ORDER00001' //unique OrderId for every request
  paramarray['CUST_ID'] = 'CUST0001'  // unique customer identifier
  paramarray['INDUSTRY_TYPE_ID'] = 'xxxxxxxxx' //Provided by Paytm
  paramarray['CHANNEL_ID'] = 'WAP' //Provided by Paytm
  paramarray['TXN_AMOUNT'] = '1.00' // transaction amount
  paramarray['WEBSITE'] = 'xxxxxxxxxxxx' //Provided by Paytm
  paramarray['CALLBACK_URL'] = 'https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp'//Provided by Paytm
  paramarray['EMAIL'] = 'abc@gmail.com' // customer email id
  paramarray['MOBILE_NO'] = '9999999999' // customer 10 digit mobile no.
  libpaytm.genchecksum(paramarray, config.paytm.key, function(err, checksum) {
    console.log('Checksum: ', checksum, '\n')
    response.writeHead(200, { 'Content-type': 'text/json', 'Cache-Control': 'no-cache' })
    response.write(JSON.stringify(checksum))
    response.end()
  })
})

module.exports = router
