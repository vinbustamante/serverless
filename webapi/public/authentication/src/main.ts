import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import HttpExceptionFilter from '../../../../common/filter/HttpExceptionFilter';
import ApplicationExceptionFilter from '../../../../common/filter/ApplicationExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false
  }));
  app.useGlobalFilters(new HttpExceptionFilter(), new ApplicationExceptionFilter());
  await app.listen(3000);
}
bootstrap();

