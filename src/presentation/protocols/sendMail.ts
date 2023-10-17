import { MailServiceError } from '../errors/mailServiceError'

export interface EmailOptions {
    readonly email: string
    readonly subject: string
    readonly template: string
    readonly data: Object
}

export interface MailService {
    sendMail: (
        options: EmailOptions
    ) => Promise<Boolean>
}
