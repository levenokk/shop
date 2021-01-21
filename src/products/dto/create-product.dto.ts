import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
  ArrayMinSize,
  IsArray,
  IsNumber,
  Min,
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

export class Size {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  count: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  size: number;
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

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Image)
  backetImg: Image;

  @IsBoolean()
  @IsOptional()
  newProduct: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => Size)
  sizes: Size[];

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
  have: boolean;
}
