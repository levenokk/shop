import { Controller, Get, Render, Session, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { CategoryService } from './category/category.service';
import { SessionInterceptor } from './session/session.interceptor';

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
  @UseInterceptors(SessionInterceptor)
  async root(@Session() session: Record<string, any>) {
    return {
      latestProducts: await this.productsService.getLatestProducts(0, 10),
      categories: await this.categoryService.getCategories(),
      products: await this.productsService.getProducts('', 0, 8),
      title: 'Divisima',
      basket: Object.keys(session.items).length,
    };
  }
}
