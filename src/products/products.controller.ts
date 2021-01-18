import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  Render,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('product')
  @Render('product')
  async renderProduct(
    @Query('product', new ValidationPipe(), new ParseIntPipe())
    productId: number,
    @Query('category', new ValidationPipe()) category: string,
  ) {
    return {
      product: await this.productsService.getProduct(productId),
      recommendation: await this.productsService.getRecommendation(
        category,
        productId,
      ),
    };
  }
}
