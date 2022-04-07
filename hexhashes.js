const text = '3';

async function digestMessage(message) {
  let msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  console.log(msgUint8)
  let hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  let hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  console.log(hashArray)
  let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  console.log(hashHex)
  let hexArray = hashHex.match(/[\s\S]{1,2}/g) || [];
  console.log(hexArray)
  hashArray = hexArray.map(b => parseInt(b, 16))
  console.log(hashArray)
  return hashHex;
}
async function hashtoByte(hex){
    hexArray = hex.match(/[\s\S]{1,2}/g) || [];
    bytes = hexArray.map(b => parseInt(b, 16))
    console.log(bytes)
    return bytes
}

let x = digestMessage(text)
  .then(digestHex => {
      console.log(digestHex)
      console.log(digestHex.length)
      return digestHex
    })
    .then(hex => {
        hashtoByte(hex)
        .then(byte => {
            console.log(byte)
        })
    })
