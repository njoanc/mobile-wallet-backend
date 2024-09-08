import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailOption } from './types/mail.types';
import configuration from '../config/configuration';
import { InternalErrorException } from '../exceptions';

const configService: ConfigService = new ConfigService(configuration);

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Initialize nodemailer transporter with Mailtrap SMTP settings
        this.transporter = nodemailer.createTransport({
            host: configService.get('MAILTRAP_HOST'), // e.g., 'smtp.mailtrap.io'
            port: configService.get('MAILTRAP_POR'), // e.g., 2525
            auth: {
                user: configService.get('MAILTRAP_USER'), // Mailtrap SMTP username
                pass: configService.get('MAILTRAP_PASSWORD'), // Mailtrap SMTP password
            },
        });
    }

    async send(options: EmailOption) {
        try {
            const message = {
                from: options.from || 'support@mobilewallet.io',
                to: options.recipients,
                subject: options.subject || 'Account Notification',
                html: options.substitutions ? this.generateHtml(options.substitutions) : '', // Generate HTML content
            };

            // Send the email using the transporter
            return await this.transporter.sendMail(message);
        } catch (error) {
            throw new InternalErrorException(error.message);
        }
    }

    // Utility to generate HTML content if substitutions are provided
    private generateHtml(substitutions: Record<string, string>): string {
        // Simple HTML structure for substitution placeholders
        let html = '<h1>Email Notification</h1>';
        for (const key in substitutions) {
            if (substitutions.hasOwnProperty(key)) {
                html += `<p>{{${key}}}: ${substitutions[key]}</p>`;
            }
        }
        return html;
    }
}
