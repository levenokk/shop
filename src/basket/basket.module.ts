import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ProductsModule } from '../products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [BasketService],
  controllers: [BasketController],
  imports: [ProductsModule],
})
export class BasketModule {}
