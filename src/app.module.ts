import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Proprety, PropretySchema } from './schemas/proprety.schema';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { PropretyController } from './controllers/proprety.controller';
import { PropretyService } from './services/proprety.service';

// imports: [MongooseModule.forRoot(process.env.MONGODB_URI)],
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/zubu_v2'),
    MongooseModule.forFeature([
      { name: Proprety.name, schema: PropretySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [AppController, ProductController, PropretyController],
  providers: [AppService, ProductService, PropretyService],
})
export class AppModule {}
