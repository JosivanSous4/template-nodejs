export interface Encrypter {
    encrypt: (data: object) => Promise<string>
}
