import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Res,
  Session,
  UseFilters, UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { BadRequestExceptionFilter } from './filters/bad-request-exception.filter';
import { SessionInterceptor } from '../session/session.interceptor';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('product')
  @UseFilters(new BadRequestExceptionFilter())
  @UseInterceptors(SessionInterceptor)
  async root(
    @Query('product', new DefaultValuePipe(0), new ParseIntPipe())
    productId: number,
    @Query('category', new DefaultValuePipe(null)) category: string | null,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    if (!productId) {
      return res.render('404', {
        title: 'Divisima | запись не найдена',
        basket: Object.keys(session.items).length,
      });
    }

    const product = await this.productsService.getProduct(productId);

    if (!product) {
      return res.render('404', {
        title: 'Divisima | запись не найдена',
        basket: Object.keys(session.items).length,
      });
    }

    const recommendation = await this.productsService.getRecommendation(
      category,
      productId,
    );

    if (session.viewsItems.indexOf(productId) === -1) {
      session.viewsItems.push(productId);
    }

    return res.render('product', {
      product,
      recommendation,
      title: 'Divisima | ' + product.title,
      basket: Object.keys(session.items).length,
    });
  }
}
