import { Controller, Get, Render, Session } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Controller('basket')
export class BasketController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @Render('cart')
  async root(@Session() session: Record<string, any>) {
    let sessionItems;

    if (!session.items) {
      sessionItems = 0;
    } else {
      sessionItems = Object.keys(session.items).length;
    }

    const viewedItems = session.viewsItems || [];
    console.log(await this.productService.getViewedproducts(viewedItems, 8));

    return {
      basket: session.items ? sessionItems : 0,
      title: 'Divisima | корзина',
      items: sessionItems
        ? await this.productService.getBasketItems(session.items)
        : [],
      recommendation: await this.productService.getViewedproducts(
        viewedItems,
        8,
      ),
    };
  }
}
