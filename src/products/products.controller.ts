import { Controller, Get, Render } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Render('product')
  render() {
    return {};
  }
}
