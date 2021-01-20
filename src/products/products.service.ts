import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product-schema';
import { InjectModel } from '@nestjs/mongoose';
import { СreateProductDto } from './dto/create-product.dto';
import { CategoryService } from '../category/category.service';

type matchType = {
  have: boolean;
  productId: {
    $ne: number;
  };
  category?: string;
};

type backetSessionType = {
  [key: number]: {
    [key: number]: {
      count: number;
      size: number;
    };
  };
};

interface productWithId extends Product {
  productId?: number;
  size?: number;
  count?: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly categoryService: CategoryService,
  ) {}

  private readonly select = {
    images: 1,
    activeImage: 1,
    title: 1,
    price: 1,
    productId: 1,
    newProduct: 1,
    _id: 0,
    information: 1,
    careDetail: 1,
    delivery: 1,
    sizes: 1,
    rating: 1,
    have: 1,
    category: 1,
  };

  async getProducts(categoryName: string, from: number, to: number) {
    if (categoryName.length) {
      const category = await this.categoryService
        .getCategory(categoryName)
        .populate({
          path: 'items',
          select: this.select,
          skip: from,
          limit: to,
        });

      return category ? category.items : [];
    }
    return this.productModel.find().select(this.select).skip(from).limit(to);
  }

  async getProduct(id: number) {
    return this.productModel.findOne({ productId: id }).select(this.select);
  }

  getLatestProducts(from: number, to: number) {
    return this.productModel.find({ newProduct: true }, null, {
      limit: to,
      skip: from,
      sort: { epoch: -1 },
    });
  }

  getRecommendation(category?, productId = 0, size = 10) {
    const match: matchType = {
      have: true,
      productId: {
        $ne: productId,
      },
    };

    if (category) {
      match.category = category;
    }

    return this.productModel.aggregate([
      {
        $match: match,
      },
      {
        $sample: { size },
      },
    ]);
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

  async getBasketItems(sessionItems: backetSessionType) {
    const products = Object.keys(sessionItems).map((item) => +item);
    const items: Product[] = await this.productModel
      .find({
        $or: [
          {
            productId: products,
          },
        ],
      })
      .select('title price productId category');

    const filteredItems = [];

    Object.entries(sessionItems).forEach((item) => {
      const id = +item[0];
      for (const i of Object.values(item[1])) {
        items.forEach((el: productWithId) => {
          if (el.productId === id) {
            filteredItems.push({
              productId: el.productId,
              count: i.count,
              title: el.title,
              size: i.size,
              price: el.price,
              category: el.category,
            });
          }
        });
      }
    });

    return filteredItems;
  }

  getViewedproducts(products: number[], size = 10) {
    const match = {
      have: true,
      $or: [
        {
          productId: products,
        },
      ],
    };

    return this.productModel.find(match);
  }
}
