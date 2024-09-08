import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Define a function that returns TypeOrmModuleOptions
export default (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: parseInt(configService.get<string>('DB_PORT', '5432')),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations_history',
  migrationsRun: false,
  autoLoadEntities: true,
  keepConnectionAlive: true,
  // Disable SSL in non-production environments
  extra: configService.get<string>('NODE_ENV') === 'production' && configService.get<string>('SSL_CERT')
    ? {
        ssl: {
          rejectUnauthorized: false,
          ca: configService.get<string>('SSL_CERT'),
        },
      }
    : {},
  synchronize: true, // Disable in production
});
