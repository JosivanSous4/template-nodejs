export interface DecrypterHash {
    decrypt: (ciphertext: string) => Promise<string>
}
