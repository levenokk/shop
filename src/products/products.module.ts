import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product-schema';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Model, ModelSchema } from './schemas/model-schema';
import { ProductsController } from './products.controller';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Connection } from 'mongoose';

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
      {
        name: Model.name,
        useFactory: (connection: Connection) => {
          const schema = ModelSchema;
          const AutoIncrement = AutoIncrementFactory(connection);

          schema.plugin(AutoIncrement, { inc_field: 'modelId' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
