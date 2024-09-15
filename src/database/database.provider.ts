import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      Logger.log('Database connection is already established', 'Database');
    } else {
      try {
        await this.dataSource.initialize();
        Logger.log('Successfully connected to the database', 'Database');
      } catch (error) {
        Logger.error('Database connection failed', error, 'Database');
      }
    }
  }
}
