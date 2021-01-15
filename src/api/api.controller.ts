import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { СreateProductDto } from '../products/dto/create-product.dto';
import { ValidationPipe } from './pipes/validation.pipe';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { BadValidationException } from "./errors/bad-validation.exception";

@Controller('api')
@UseInterceptors(TimeoutInterceptor)
export class ApiController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  @UseInterceptors(new TransformInterceptor())
  getProducts(
    @Query('from', new DefaultValuePipe(0), new ParseIntPipe()) from: number,
    @Query('to', new DefaultValuePipe(10), new ParseIntPipe()) to: number,
  ) {
    return this.productsService.getLatestProducts(from, to);
  }

  @Post('createProduct')
  @UseInterceptors(new TransformInterceptor())
  @UseFilters(new BadValidationException())
  createProduct(
    @Body(new ValidationPipe()) createProductDto: СreateProductDto,
  ) {
    return this.productsService.createProduct(createProductDto);
  }
}
