import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [ApiController],
  imports: [ProductsModule],
})
export class ApiModule {}
