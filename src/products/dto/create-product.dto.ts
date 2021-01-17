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

  @IsInt()
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
}
