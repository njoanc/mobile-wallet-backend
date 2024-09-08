"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const utils_1 = require("./utils");
const utils_2 = require("./utils");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.setGlobalPrefix('api/v1');
    // <--  Swagger setup  -->
    (0, utils_1.SwaggerInit)(app);
    await app.listen(port, () => {
        common_1.Logger.log(`Server running on ${(0, utils_2.host)()}`, 'Bootstrap');
        common_1.Logger.log(`Swagger running on ${(0, utils_2.host)()}/docs`, 'Swagger');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map