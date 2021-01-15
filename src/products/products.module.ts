import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product-schema';

import { MongooseModule } from '@nestjs/mongoose';
import { Model, ModelSchema } from './schemas/model-schema';
import { ProductsController } from './products.controller';

@Module({
  providers: [ProductsService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: Model.name,
        useFactory: () => {
          const schema = ModelSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
