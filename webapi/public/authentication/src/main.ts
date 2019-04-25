import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ConfigService from '../../../../common/services/ConfigService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  const serviceConfig = configService.service;
  await app.listen(serviceConfig.port);
}
bootstrap();