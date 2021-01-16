import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ProductsModule } from '../products/products.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [ApiController],
  imports: [ProductsModule, CategoryModule],
})
export class ApiModule {}
