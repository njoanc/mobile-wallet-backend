import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import ormconfig from '../ormconfig';

const configService = new ConfigService();

export const AppDataSource = new DataSource(ormconfig(configService));
