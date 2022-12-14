import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //  load dotenv
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  //  launch
  await app.listen(PORT);
}
bootstrap();
