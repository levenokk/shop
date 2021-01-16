import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsMongoId,
  IsOptional, IsBoolean,
} from 'class-validator';

export class СreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsMongoId()
  @IsOptional()
  category: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsBoolean()
  @IsOptional()
  newProduct: boolean;
}
