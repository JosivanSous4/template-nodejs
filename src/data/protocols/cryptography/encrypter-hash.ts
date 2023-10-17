export interface EncrypterHash {
    encrypt: (cipher: any) => Promise<string>
}
