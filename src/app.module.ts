import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Proprety, PropretySchema } from './schemas/proprety.schema';
import { PropretyController } from './controllers/proprety.controller';
import { PropretyService } from './services/proprety.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([
      { name: Proprety.name, schema: PropretySchema },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, PropretyController],
  providers: [AppService, PropretyService],
})
export class AppModule {}
