import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { ValidationPipe } from '../api/pipes/validation.pipe';
import { BadRequestExceptionFilter } from './filters/bad-request-exception.filter';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('product')
  @UseFilters(new BadRequestExceptionFilter())
  async root(
    @Query('product', new DefaultValuePipe(0), new ParseIntPipe())
    productId: number,
    @Query('category', new DefaultValuePipe(null)) category: string | null,
    @Res() res: Response,
  ) {
    if (!productId) {
      return res.render('404', {
        title: 'Divisima | запись не найдена',
      });
    }

    const product = await this.productsService.getProduct(productId);

    if (!product) {
      return res.render('404', {
        title: 'Divisima | запись не найдена',
      });
    }

    const recommendation = await this.productsService.getRecommendation(
      category,
      productId,
    );

    return res.render('product', {
      product,
      recommendation,
      title: 'Divisima | ' + product.title,
    });
  }
}
