export class MailServiceError extends Error {
    constructor() {
        super('Erro de serviço de e-mail.')
        this.name = 'MailServiceError'
    }
}
