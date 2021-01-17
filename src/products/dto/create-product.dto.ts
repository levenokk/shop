import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
  ArrayMinSize,
  IsArray,
  isArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Image {
  @IsString()
  @IsNotEmpty()
  src: string;

  @IsString()
  @IsNotEmpty()
  alt: string;
}

export class СreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ValidateNested()
  images: Image[];

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Image)
  activeImage: Image;

  @IsBoolean()
  @IsOptional()
  newProduct: boolean;

  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  sizes: number[];

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsString()
  @IsNotEmpty()
  careDetail: string;

  @IsString()
  @IsNotEmpty()
  delivery: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsBoolean()
  @IsOptional()
  have: boolean
}
