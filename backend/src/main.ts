import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    origin: 'http://localhost:3000/',
    credential:true
  });
  await app.listen(4000);
  console.log(
    `Server is listening on: ${(await app.getUrl())}`,
  );
}
bootstrap();
