(function () {
  function base64StringToArrayBuffer (base64) {
    var binary_string = atob(base64)
    var len = binary_string.length
    var bytes = new Uint8Array(len)
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i)
    }
    return bytes.buffer
  }

  function convertPemToBinary2 (pem) {
    var lines = pem.split('\n')
    var encoded = ''
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].trim().length > 0 &&
                lines[i].indexOf('-BEGIN RSA PRIVATE KEY-') < 0 &&
                lines[i].indexOf('-BEGIN RSA PUBLIC KEY-') < 0 &&
                lines[i].indexOf('-BEGIN PRIVATE KEY-') < 0 &&
                lines[i].indexOf('-BEGIN PUBLIC KEY-') < 0 &&
                lines[i].indexOf('-END PUBLIC KEY-') < 0 &&
                lines[i].indexOf('-END RSA PRIVATE KEY-') < 0 &&
                lines[i].indexOf('-END PRIVATE KEY-') < 0 &&
                lines[i].indexOf('-END RSA PUBLIC KEY-') < 0) {
        encoded += lines[i].trim()
      }
    }
    return encoded
  }

  function str2abUtf8 (str) {
    if (window.TextEncoder) {
      return new TextEncoder('utf-8').encode(str)
    }
    var utf8 = unescape(encodeURIComponent(str))
    var result = new Uint8Array(utf8.length)
    for (var i = 0; i < utf8.length; i++) {
      result[i] = utf8.charCodeAt(i)
    }
    return result
  }

  function arrayBufferToBase64String (arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer)
    var byteString = ''
    for (var i = 0; i < byteArray.byteLength; i++) {
      byteString += String.fromCharCode(byteArray[i])
    }
    return btoa(byteString)
  }
  var c = window.crypto ? window.crypto.subtle : window.msCrypto.subtle
  var rsaParams = {name: 'RSA-OAEP', hash: {name: 'SHA-1'}}

  function publicEncrypt (keyInPemFormat, message, callback) {
    var key = convertPemToBinary2(keyInPemFormat)
    key = base64StringToArrayBuffer(key)
    var testWhat = c.importKey('spki', key, rsaParams, false, ['encrypt'])
    if (typeof Promise !== 'undefined') {
      testWhat.then(function (cryptokey) {
        console.log(rsaParams)
        console.log(cryptokey)
        console.log(str2abUtf8(message))

        c.encrypt(rsaParams, cryptokey, str2abUtf8(message))
          .then(function (encrypted) {
            callback(arrayBufferToBase64String(encrypted))
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    } else {
      testWhat.oncomplete = function (cryptokey) {
        console.log(cryptokey.target.result)
        var b = c.encrypt(rsaParams, cryptokey.target.result, str2abUtf8(message))
        b.oncomplete = function (encrypted) {
          callback(arrayBufferToBase64String(encrypted.target.result))
        }
      }
    }
  }
  function rsaEncrypt (message, callback) {
    var key =
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDiPDf8ep0cgjLUbIx6rCOQS4ct\n' +
            '0KpRbgmJUyVCqCxhfhAyNvtnpShsN7bIRA+Wpx79LOm2zpfZb8LzzP90q+boUcP2\n' +
            'VmZ2nd+hPD525dCQcerxQ6ywSmKqjXsu2Nivw7NFq1f+CsfPjizCOgyccK7rkWvx\n' +
            'DsKYI31akTRLvVkONwIDAQAB\n'
    publicEncrypt(key, message, callback)
  }

  window.rsaEncrypt = rsaEncrypt
})()
