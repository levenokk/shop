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

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Image)
  image: Image;

  @IsBoolean()
  @IsOptional()
  newProduct: boolean;
}
