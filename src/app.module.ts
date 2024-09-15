// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormconfig from '../ormconfig';
import { DatabaseService } from './database/database.provider';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import configuration from './config/configuration';
import { AppDataSource } from './data-source';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...AppDataSource.options,
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    WalletModule,
    TransactionModule,
  ],
  providers: [DatabaseService],
  controllers: [],
})
export class AppModule {}
