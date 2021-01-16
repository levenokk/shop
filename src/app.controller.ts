import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  Render,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { CategoryService } from './category/category.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productsService: ProductsService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  @Render('index')
  async render() {
    return {
      latestProducts: await this.productsService.getLatestProducts(0, 10),
      categories: await this.categoryService.getCategories(),
      products: await this.productsService.getProducts('', 0, 8),
    };
  }

  @Get('product')
  @Render('product')
  async renderProduct(
    @Query('product', new ValidationPipe(), new ParseIntPipe()) id: number,
  ) {
    return {
      product: await this.productsService.getProduct(id),
    };
  }
}
