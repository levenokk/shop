import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
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

  @Post('/addToBacket')
  @UseFilters(new BadValidationException())
  addToBacket(
    @Session() session: Record<string, any>,
    @Body() id: number,
    @Body() count: number,
  ) {
    if (!session.items) {
      session.items = [];
    }

    session.items.push({ id, count });

    return session.items;
  }

  @Post('createCategory')
  @UseInterceptors(new TransformInterceptor())
  @UseFilters(new BadValidationException())
  createCategory(
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createCategory(createCategoryDto);
  }
}
