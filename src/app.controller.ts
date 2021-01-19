import { Controller, Get, Render, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { CategoryService } from './category/category.service';

export type controllerType = {
  title: string;
  basket: number;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productsService: ProductsService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  @Render('index')
  async root(@Session() session: Record<string, any>) {
    return {
      latestProducts: await this.productsService.getLatestProducts(0, 10),
      categories: await this.categoryService.getCategories(),
      products: await this.productsService.getProducts('', 0, 8),
      title: 'Divisima',
      basket: session.items ? Object.keys(session.items).length : 0,
    };
  }
}
