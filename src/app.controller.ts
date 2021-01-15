import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  @Render('index')
  async render() {
    return {
      products: await this.productsService.getLatestProducts(0, 10),
      test: [1, 2, 3, 4, 5, 6],
    };
  }
}
