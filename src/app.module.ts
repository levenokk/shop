import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { CategoryModule } from './category/category.module';
import { Session } from './session/session.module';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/shop', {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    ApiModule,
    CategoryModule,
    Session,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
