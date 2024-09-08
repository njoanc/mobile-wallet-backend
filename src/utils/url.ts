import { ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

// Initialize ConfigService
const configService = new ConfigService(configuration);

// Get the port from the config or environment, defaulting to 3000
const port = configService.get<number>('PORT', 3000);

export const host = (): string => {
  return `http://localhost:${port}`;
};
