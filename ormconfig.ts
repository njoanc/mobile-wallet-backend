import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default (configService: ConfigService): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: parseInt(configService.get<string>('DB_PORT', '5432')),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  synchronize: false, // Set to false in production
  logging: false,
  entities: [join(__dirname, 'src/**/entities/**/*.{ts,js}')],
  migrations: [join(__dirname, 'src/database/migrations/*.{ts,js}')],
  migrationsRun: false,
  extra: configService.get<string>('NODE_ENV') === 'production' && configService.get<string>('SSL_CERT')
    ? {
        ssl: {
          rejectUnauthorized: false,
          ca: configService.get<string>('SSL_CERT'),
        },
      }
    : {},
});
