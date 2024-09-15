import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

// Database Configuration
const getDatabaseConfig = () => ({
  test: {
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: false,
  },
  development: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Password@12',
    database: process.env.DB_NAME || 'wallet_api',
    synchronize: false,
    logging: true,
  },
});

// Choose the appropriate database config based on the environment
const databaseConfig = process.env.NODE_ENV === 'test' 
  ? getDatabaseConfig().test 
  : getDatabaseConfig().development;

// Flutterwave Configuration
const flutterwaveConfig = {
  publicKey: process.env.FLW_PUBLIC_KEY || '',
  secretKey: process.env.FLW_SECRET_KEY || '',
};

// Nodemailer Configuration
const nodemailerConfig = {
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT, 10),
  user: process.env.MAILTRAP_USER,
  password: process.env.MAILTRAP_PASSWORD,
};

// Redis Configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
};

// Stripe Configuration
const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY || '',
};

// JWT Configuration
const jwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY || '',
};

// SSL Configuration
const sslConfig = process.env.SSL_CERT || '';

// Export the configuration as a function using `registerAs`
export default registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || 'localhost',
  database: databaseConfig,
  flutterwave: flutterwaveConfig,
  nodemailer: nodemailerConfig,
  redis: redisConfig,
  stripe: stripeConfig,
  jwt: jwtConfig,
  sslCert: sslConfig,
}));
