import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Product } from 'src/schemas/product.schema';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Res() response, @Body() product: Product) {
    const newProduct = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({ newProduct });
  }

  @Get()
  async fetchAll(@Res() response) {
    const products = await this.productService.readAll();
    return response.status(HttpStatus.OK).json({ products });
  }
}
