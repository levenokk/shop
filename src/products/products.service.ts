import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product-schema';
import { InjectModel } from '@nestjs/mongoose';
import { СreateProductDto } from './dto/create-product.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly categoryService: CategoryService,
  ) {}

  async getProducts(categoryName: string, from: number, to: number) {
    if (categoryName.length) {
      const category = await this.categoryService
        .getCategory(categoryName)
        .populate({
          path: 'items',
          select: {
            image: 1,
            title: 1,
            price: 1,
            productId: 1,
            newProduct: 1,
            _id: 0,
          },
        })
        .skip(from)
        .limit(to);

      return category ? category.items : [];
    }
    return this.productModel
      .find()
      .select({
        image: 1,
        title: 1,
        price: 1,
        productId: 1,
        newProduct: 1,
        _id: 0,
      })
      .skip(from)
      .limit(to);
  }

  getLatestProducts(from: number, to: number) {
    return this.productModel.find({ newProduct: true }, null, {
      limit: to,
      skip: from,
      sort: { epoch: -1 },
    });
  }

  async createProduct(body: СreateProductDto): Promise<ProductDocument> {
    const category = await this.categoryService.getCategory(body.category);

    if (!category) {
      throw new BadRequestException('Category is not exists');
    }

    const product = new this.productModel(body);

    await product.save();

    category.items.push(product.id);
    await category.save();

    return product;
  }
}
