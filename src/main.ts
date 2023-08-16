import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from './utils/handler/exception.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(configService.get<string>('http.port'));
}
bootstrap();
