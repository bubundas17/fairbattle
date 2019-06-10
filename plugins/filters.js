import Vue from 'vue'
import moment from "moment";

Vue.filter("formatDate", (val) => {
    return moment(val).format("Do MMM, YYYY.  h:ma");
});

Vue.filter("fromNow", (val) => {
    return moment(val).fromNow();
});

Vue.filter("countSMS", (val) => {
    return smsLength(val)
});

function smsLength(message){
  let bytesPerSms = 1120;
  let bytes = getByteLength(message)
  return Math.ceil(bytes/bytesPerSms)
}

function getByteLength(normal_val) {
  // Force string type
  normal_val = String(normal_val);

  var byteLen = 0;
  for (var i = 0; i < normal_val.length; i++) {
    var c = normal_val.charCodeAt(i);
    byteLen += 	c < (1 <<  7) ? 1 :
      c < (1 << 11) ? 2 :
        c < (1 << 16) ? 3 :
          c < (1 << 21) ? 4 :
            c < (1 << 26) ? 5 :
              c < (1 << 31) ? 6 : Number.NaN;
  }
  return byteLen*8;
}
