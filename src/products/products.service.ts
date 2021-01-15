import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product-schema';
import { InjectModel } from '@nestjs/mongoose';
import { СreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  getLatestProducts(from: number, to: number) {
    return this.productModel.find({}, null, {
      limit: to,
      skip: from,
      sort: { epoch: -1 },
    });
  }

  async createProduct(body: СreateProductDto): Promise<ProductDocument> {
    const product = new this.productModel(body);
    await product.save();

    return product;
  }
}
