import { Encrypter, Decrypter } from '../data/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(
        private readonly secret: string,
        private readonly expiresIn: string
    ) { }

    async encrypt(data: object): Promise<string> {
        return jwt.sign(data, this.secret, { expiresIn: this.expiresIn })
    }

    async decrypt(ciphertext: string): Promise<string> {
        return jwt.verify(ciphertext, this.secret) as any
    }
}
