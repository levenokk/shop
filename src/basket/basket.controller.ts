import { Controller, Get, Render, Session } from '@nestjs/common';
import { controllerType } from '../app.controller';
import { ProductsService } from '../products/products.service';

@Controller('basket')
export class BasketController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @Render('cart')
  async root(@Session() session: Record<string, any>): Promise<controllerType> {
    await this.productService.getBasketItems(
      session.items,
    );
    return {
      basket: session.items ? Object.keys(session.items).length : 0,
      title: 'Divisima | корзина',
    };
  }
}
