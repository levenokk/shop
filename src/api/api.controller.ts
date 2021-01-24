import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Session,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { СreateProductDto } from '../products/dto/create-product.dto';
import { ValidationPipe } from './pipes/validation.pipe';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { BadValidationException } from './errors/bad-validation.exception';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { AddBucketDto } from './dto/add-bucket.dto';
import { SessionInterceptor } from '../session/session.interceptor';
import { RemoveItemDto } from './dto/remove-item.dto';
import { ChangeCountDto } from './dto/change-count.dto';

@Controller('api')
@UseInterceptors(TimeoutInterceptor)
export class ApiController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get('latestProducts')
  @UseInterceptors(new TransformInterceptor())
  getLatestProducts(
    @Query('from', new DefaultValuePipe(0), new ParseIntPipe()) from: number,
    @Query('to', new DefaultValuePipe(10), new ParseIntPipe()) to: number,
  ) {
    return this.productsService.getLatestProducts(from, to);
  }

  @Get('recommendations')
  @UseInterceptors(new TransformInterceptor())
  getRecommendations(
    @Query('category', new ValidationPipe()) category: string,
    @Query('product', new ValidationPipe()) productId: number,
  ) {
    return this.productsService.getRecommendation(category, productId);
  }

  @Get('products')
  @UseInterceptors(new TransformInterceptor())
  getProducts(
    @Query('category', new DefaultValuePipe('')) categoryName: string,
    @Query('from', new DefaultValuePipe(0), new ParseIntPipe()) from: number,
    @Query('to', new DefaultValuePipe(10), new ParseIntPipe()) to: number,
  ) {
    return this.productsService.getProducts(categoryName, from, to);
  }

  @Get('product')
  @UseInterceptors(new TransformInterceptor())
  getProduct(
    @Query('id', new ValidationPipe(), new ParseIntPipe()) id: number,
  ) {
    return this.productsService.getProduct(id) || {};
  }

  @Post('createProduct')
  @UseInterceptors(new TransformInterceptor())
  @UseFilters(new BadValidationException())
  createProduct(
    @Body(new ValidationPipe()) createProductDto: СreateProductDto,
  ) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get('/categories')
  @UseInterceptors(new TransformInterceptor())
  @UseFilters(new BadValidationException())
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Post('addToBucket')
  @UseInterceptors(new TransformInterceptor())
  @UseFilters(new BadValidationException())
  async addToBucket(
    @Session() session: Record<string, any>,
    @Body(new ValidationPipe()) body: AddBucketDto,
  ) {
    const { productId, size, count } = body;
    let isNew = true;

    if (session.items[`${productId}:${size}`]) {
      isNew = false;
      session.items[`${productId}:${size}`] = {
        size,
        count,
        productId,
      };
    } else {
      session.items[`${productId}:${size}`] = {
        productId,
        size,
        count,
      };
    }

    return {
      ok: true,
      isNew,
    };
  }

  @Post('createCategory')
  @UseInterceptors(new TransformInterceptor())
  @UseFilters(new BadValidationException())
  createCategory(
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get('basket')
  @UseInterceptors(new TransformInterceptor())
  @UseInterceptors(SessionInterceptor)
  async getBasketItems(@Session() session: Record<string, any>) {
    return Object.values(session.items).length
      ? await this.productsService.getBasketItems(session.items)
      : [];
  }

  @Put('basket/removeItem')
  @UseInterceptors(new TransformInterceptor())
  @UseInterceptors(SessionInterceptor)
  @UseFilters(new BadValidationException())
  async removeBasketItem(
    @Body(new ValidationPipe()) body: RemoveItemDto,
    @Session() session: Record<string, any>,
  ) {
    const { productId, size } = body;

    delete session.items[`${productId}:${size}`];
    return true;
  }

  @Put('basket/changeCount')
  @UseInterceptors(new TransformInterceptor())
  @UseInterceptors(SessionInterceptor)
  @UseFilters(new BadValidationException())
  async addCount(
    @Body(new ValidationPipe()) body: ChangeCountDto,
    @Session() session: Record<string, any>,
  ) {
    const { productId, size, count } = body;

    if (!session.items[`${productId}:${size}`]) {
      return {
        ok: false,
        message: 'Произошла не известная ошибка',
      };
    }
    const product = await this.productsService.getProduct(productId);
    const currentSize = product.sizes.find(item=>item.size === size)
    const productCount = (product.sizes[0].count) + 1;
  // дофиксить ограничения кол продуктов
    if (!product.sizes.length || productCount < count) {
      if (product.sizes[0].count < count) {
        session.items[`${productId}:${size}`] = {
          ...session.items[`${productId}:${size}`],
          count: productCount,
        };
      }
      return {
        ok: false,
        message: 'Недостатньо товару для покупки',
      };
    }

    session.items[`${productId}:${size}`] = {
      ...session.items[`${productId}:${size}`],
      count,
    };

    return {
      ok: true,
      message: 'Успех',
    };
  }
}
