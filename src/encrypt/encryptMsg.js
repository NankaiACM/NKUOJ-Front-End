import publicKeyFile from './id_rsa.pub.js'
const forge = require('node-forge');
export default function (message) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyFile.publicKey)
  const encrypted = publicKey.encrypt(message)
  return forge.util.encode64(encrypted)
}
