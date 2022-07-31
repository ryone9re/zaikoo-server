import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PrismaService } from './libs/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('zaikos server')
    .setDescription('zaikos server')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
          tokenUrl: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
          scopes: {
            'https://www.googleapis.com/auth/contacts.readonly':
              'OAuth readonly scopes',
          },
        },
      },
    })
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      oauth2RedirectUrl: `${process.env.HOST_URI}/docs/oauth2-redirect.html`,
    },
  };
  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(8080);
}
bootstrap();
