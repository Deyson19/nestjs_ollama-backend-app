import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  app.setGlobalPrefix('api/v1');
  const port = process.env.PORT || 5000;
  app.enableCors();
  await app.listen(port, () => {
    logger.log(`Server running on port ${port}`);
  });
}
bootstrap();
