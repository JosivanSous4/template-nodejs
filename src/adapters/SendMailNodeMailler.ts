import { MailService, EmailOptions } from '../presentation/protocols/sendMail'
import * as nodemailer from 'nodemailer'
import { MailServiceError } from '../presentation/errors/mailServiceError'
import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'

class SendMailNodeMailler implements MailService {
    async sendMail(
        options: EmailOptions
    ): Promise<Boolean> {
        try {
            const emailTemplateSource = fs.readFileSync(
                path.join(__dirname, `../public/templates/${options.template}.hbs`),
                'utf8'
            )
            const partialHeader = fs.readFileSync(
                path.join(__dirname, '../public/templates/partial/header.hbs'),
                'utf8'
            )
            const partialFooter = fs.readFileSync(
                path.join(__dirname, '../public/templates/partial/footer.hbs'),
                'utf8'
            )

            const data = {
                ...options.data,
                url: process.env.URL_FRONT || ''
            }

            Handlebars.registerPartial('header', partialHeader)
            Handlebars.registerPartial('footer', partialFooter)
            const template = Handlebars.compile(emailTemplateSource)
            const htmlToSend = template(data)

            const transporter = nodemailer.createTransport({
                port: Number(process.env.MAIL_PORT),
                host: process.env.MAIL_HOST,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            })

            await transporter.sendMail({
                from: `Atendimento <${process.env.MAIL_FROM}>`,
                to: options.email,
                subject: options.subject,
                html: htmlToSend
            })

            return true
        } catch (error) {
            console.error(error);

            throw new MailServiceError()
        }
    }
}

export { SendMailNodeMailler }
