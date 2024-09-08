"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
const configuration_1 = __importDefault(require("../config/configuration"));
const exceptions_1 = require("../exceptions");
const configService = new config_1.ConfigService(configuration_1.default);
let MailService = class MailService {
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
    async send(options) {
        try {
            const message = {
                from: options.from || 'support@mobilewallet.io',
                to: options.recipients,
                subject: options.subject || 'Account Notification',
                html: options.substitutions ? this.generateHtml(options.substitutions) : '', // Generate HTML content
            };
            // Send the email using the transporter
            return await this.transporter.sendMail(message);
        }
        catch (error) {
            throw new exceptions_1.InternalErrorException(error.message);
        }
    }
    // Utility to generate HTML content if substitutions are provided
    generateHtml(substitutions) {
        // Simple HTML structure for substitution placeholders
        let html = '<h1>Email Notification</h1>';
        for (const key in substitutions) {
            if (substitutions.hasOwnProperty(key)) {
                html += `<p>{{${key}}}: ${substitutions[key]}</p>`;
            }
        }
        return html;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map