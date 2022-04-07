let ciphertext;
let cipherTextTest;
let buffer;
(() => {

  /*
  Store the calculated ciphertext and IV here, so we can decrypt the message later.
  */

  let iv;
  
  /*
  Fetch the contents of the "message" textbox, and encode it
  in a form we can use for the encrypt operation.
  */
  function getMessageEncoding() {
    const messageBox = document.querySelector("#aes-gcm-message");
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
  }

  /*
  Get the encoded message, encrypt it and display a representation
  of the ciphertext in the "Ciphertext" element.
  */
  async function encryptMessage(key) {
    let encoded = getMessageEncoding();
    // The iv must never be reused with a given key.
    iv = window.crypto.getRandomValues(new Uint8Array(12));
    ciphertext = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      encoded
    );

    //let buffer = new Uint8Array(ciphertext, 0, 5);
    
    let buffer = new Uint8Array(ciphertext);
    console.log(buffer)
    buffer = new Uint8Array(buffer)
    console.log('check1')
    console.log(buffer)
    buffer.forEach(data => {

    })
    let x = btoa(new Uint8Array(ciphertext))
    let y = btoa(buffer)
    console.log(y)
    y = y.split(',')
    y = Uint8Array.from(y)
    y = buffer
    console.log('Check')
    console.log(y)
    ciphertext = y
    const ciphertextValue = document.querySelector(".aes-gcm .ciphertext-value");
    ciphertextValue.classList.add('fade-in');
    ciphertextValue.addEventListener('animationend', () => {
      ciphertextValue.classList.remove('fade-in');
    });
    ciphertextValue.innerHTML = `
    BTOA: ${x}
    <br>
    Cipher: ${y}
    <br>
    Raw Bytes ${ciphertext.byteLength} (${0}): ${buffer}
    `;
  }

  /*
  Fetch the ciphertext and decrypt it.
  Write the decrypted message into the "Decrypted" box.
  */
  async function decryptMessage(key) {
    let decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      ciphertext
    );
    console.log(decrypted)
    let dec = new TextDecoder();
    const decryptedValue = document.querySelector(".aes-gcm .decrypted-value");
    decryptedValue.classList.add('fade-in');
    decryptedValue.addEventListener('animationend', () => {
      decryptedValue.classList.remove('fade-in');
    });
    decryptedValue.textContent = dec.decode(decrypted);
  }

  /*
  Generate an encryption key, then set up event listeners
  on the "Encrypt" and "Decrypt" buttons.
  */
  window.crypto.subtle.generateKey(
    {
        name: "AES-GCM",
        length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  ).then((key) => {
    const encryptButton = document.querySelector(".aes-gcm .encrypt-button");
    encryptButton.addEventListener("click", () => {
      encryptMessage(key);
    });

    const decryptButton = document.querySelector(".aes-gcm .decrypt-button");
    decryptButton.addEventListener("click", () => {
      decryptMessage(key);
    });
  });

})();
