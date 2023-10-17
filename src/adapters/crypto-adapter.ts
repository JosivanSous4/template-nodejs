import { DecrypterHash, EncrypterHash } from '../data/protocols'

import crypto from 'crypto-js'

export class CryptoAdapter implements EncrypterHash, DecrypterHash {
    constructor(
        private readonly secret: string,
    ) { }

    async encrypt(data: any): Promise<string> {
        return await crypto.AES.encrypt(data, this.secret).toString()
    }

    async decrypt(ciphertext: string): Promise<string> {
        const bytes = await crypto.AES.decrypt(ciphertext, this.secret)
        return bytes.toString(crypto.enc.Utf8)
    }
}
