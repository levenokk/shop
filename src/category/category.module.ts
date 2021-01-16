import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category-schema';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  providers: [CategoryService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: (connection: Connection) => {
          const schema = CategorySchema;
          const AutoIncrement = AutoIncrementFactory(connection);

          schema.plugin(AutoIncrement, { inc_field: 'CategoryId' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
