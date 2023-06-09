import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct
      .save()
      .then((data) => data)
      .catch((err) => err);
  }

  async readAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async readById(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, Product: Product): Promise<Product> {
    return await this.productModel
      .findByIdAndUpdate(id, Product, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    return await this.productModel.findByIdAndRemove(id);
  }
}
