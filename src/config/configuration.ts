import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
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
