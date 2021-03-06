import {
  Controller,
  Get,
  Render,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { SessionInterceptor } from '../session/session.interceptor';
import * as _ from 'lodash';

@Controller('basket')
export class BasketController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @UseInterceptors(SessionInterceptor)
  @Render('cart')
  async root(@Session() session: Record<string, any>) {
    const viewedItems =
      _.without(
        session.viewsItems,
        ...Object.values(session.items).map((item: any) => item.productId),
      ) || [];

    return {
      basket: Object.values(session.items).length,
      title: 'Divisima | корзина',
      items: Object.values(session.items).length
        ? await this.productService.getBasketItems(session.items)
        : [],
      recommendation: await this.productService.getViewedproducts(
        viewedItems,
        8,
      ),
    };
  }
}
