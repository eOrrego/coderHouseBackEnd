import mailer from 'nodemailer';
import config from '../config/config.js';

class EmailService {
    constructor() {
        this.transport = mailer.createTransport({
            service: config.mailing_service,
            auth: {
                user: config.mailing_user,
                pass: config.mailing_password
            }
        });
    }

    async sendEmail(email, subject, message) {
        try {
            await this.transport.sendMail({
                from: config.mailing_user,
                to: email,
                subject,
                html: message
            });
            return true;
        } catch (error) {
            return error;
        }
    }

    async sendEmailResetPassword(email, subject, message) {
        try {
            await this.transport.sendMail({
                from: config.mailing_user,
                to: email,
                subject,
                html: message
            });
            return true;
        } catch (error) {
            return error;
        }
    }
}

const emailService = new EmailService();

export default emailService;