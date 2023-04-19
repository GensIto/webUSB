import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORSミドルウェアを追加
  app.use(cors());

  await app.listen(3005);
}
bootstrap();
