import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { CategoryModule } from './category/category.module';
import { SessionModule } from './session/session.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/shop'),
    ApiModule,
    CategoryModule,
    SessionModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
