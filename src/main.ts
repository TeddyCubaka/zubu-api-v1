import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors : true} );
  app.setGlobalPrefix('api/v1');
 // app.enableCors({
  //  origin: '*',
  //  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //  preflightContinue: false,
   // optionsSuccessStatus: 204,
 // });
  await app.listen(process.env.PORT || 3000);
}
export default bootstrap();
