let config = require("./config")
let libpaytm = require("./lib/libpaytm")
var paramarray = {}
paramarray['MID'] = 'HArEpe25787113545929' //Provided by Paytm
paramarray['ORDER_ID'] = 'ORDER00001' //unique OrderId for every request
paramarray['CUST_ID'] = 'CUST0001'  // unique customer identifier
paramarray['INDUSTRY_TYPE_ID'] = 'Retail' //Provided by Paytm
paramarray['CHANNEL_ID'] = 'WAP' //Provided by Paytm
paramarray['TXN_AMOUNT'] = '1.00' // transaction amount
paramarray['WEBSITE'] = 'WEBSTAGING' //Provided by Paytm
paramarray['CALLBACK_URL'] = 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' + paramarray["ORDER_ID"]
paramarray['EMAIL'] = 'abc@gmail.com' // customer email id
paramarray['MOBILE_NO'] = '9999999999' // customer 10 digit mobile no.
libpaytm.genchecksum(paramarray, config.paytm.key, function(err, checksum) {
  console.log('Checksum: ', checksum, '\n')
})
