// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormconfig from '../ormconfig';
import { DatabaseService } from './database/database.provider'; 
import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import {AppDataSource} from "./data-source"

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
  ],
  providers: [DatabaseService],  
  controllers: [],
})
export class AppModule {}
