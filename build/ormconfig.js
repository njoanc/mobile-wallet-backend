"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = (configService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: parseInt(configService.get('DB_PORT', '5432')),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    synchronize: false, // Set to false in production
    logging: false,
    entities: [(0, path_1.join)(__dirname, 'src/**/entities/**/*.{ts,js}')],
    migrations: [(0, path_1.join)(__dirname, 'src/database/migrations/*.{ts,js}')],
    migrationsRun: false,
    extra: configService.get('NODE_ENV') === 'production' && configService.get('SSL_CERT')
        ? {
            ssl: {
                rejectUnauthorized: false,
                ca: configService.get('SSL_CERT'),
            },
        }
        : {},
});
//# sourceMappingURL=ormconfig.js.map