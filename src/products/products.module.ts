import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product-schema';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Connection } from 'mongoose';
import { CategoryModule } from '../category/category.module';

@Module({
  providers: [ProductsService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: async (connection: Connection) => {
          const schema = ProductSchema;
          const AutoIncrement = AutoIncrementFactory(connection);

          schema.plugin(AutoIncrement, { inc_field: 'productId' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    CategoryModule,
  ],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
