"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerInit = void 0;
const swagger_1 = require("@nestjs/swagger");
const SwaggerInit = (app) => {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mobile Wallet API')
        .setDescription('Mobile Wallet API Documentation')
        .setVersion('1.0.0')
        .addTag('mobile')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
};
exports.SwaggerInit = SwaggerInit;
//# sourceMappingURL=swagger-setup.js.map