"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.default = (0, config_1.registerAs)('app', () => ({
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || 'localhost',
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'Kazubajoanna@12',
        name: process.env.DB_NAME || 'wallet_api',
    },
    flutterwave: {
        publicKey: process.env.FLW_PUBLIC_KEY || '',
        secretKey: process.env.FLW_SECRET_KEY || '',
    },
    nodemailer: {
        host: process.env.MAILTRAP_HOST,
        port: parseInt(process.env.MAILTRAP_PORT, 10),
        user: process.env.MAILTRAP_USER,
        password: process.env.MAILTRAP_PASSWORD,
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY || '',
    },
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY || '',
    },
    sslCert: process.env.SSL_CERT || '',
}));
//# sourceMappingURL=configuration.js.map