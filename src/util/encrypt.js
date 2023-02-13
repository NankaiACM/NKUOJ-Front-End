import forge from 'node-forge'

export default {
    encrypt: (message) => {
        const publicKey = '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6Pft9UagQd0qms5MSWP46oTVUCrckjW40mAT5HUqHqmhPM/TcUi7UzLJHj9NAosEDU7u+4if5dCjx31B6ZAOiDdeS6ahRSYgFyxdmIBrMXMbdWdviQ5FThTcOc9ppKSpAfRi3nexqmSi5Kc2RUDTUFIKXvCheciEAyT5/XFxsDKuBPzOzHgrhvEkv0SnyaRWdBZoExuLT4EeGAepyq4Otf8+qw8oSySFzV1qCSCC0fVSHmOQGMbg3RrBNBPqPUpLVVm+wqEHBGLHi94kA/vSObgRZVOPr2P2RpcDh6Z36g5PqaKBtC+vKnWokeDzO85QHgSNcapfCO92MlvV94lPlwIDAQAB\n-----END PUBLIC KEY-----'
        const keyObject = forge.pki.publicKeyFromPem(publicKey)
        const encrypted = keyObject.encrypt(message)
        return forge.util.encode64(encrypted)
    }
}