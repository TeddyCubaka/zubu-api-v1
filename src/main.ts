import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: ['http://localhost:3000', 'https://dev.woubou.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept, Accept-Language, Authorization',
  });

  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 3000);
}
export default bootstrap();

