import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerInit = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Mobile Wallet API')
        .setDescription('Mobile Wallet API Documentation')
        .setVersion('1.0.0')
        .addTag('mobile')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
};
