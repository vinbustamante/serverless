import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ConfigService from '../../../../common/services/ConfigService';
import traceMiddleware from '../../../../common/middleware/traceMiddleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.use(traceMiddleware(app));
  const serviceConfig = configService.service;
  await app.listen(serviceConfig.port);
}
bootstrap();