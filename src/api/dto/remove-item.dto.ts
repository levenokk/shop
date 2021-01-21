import { IsNumber } from 'class-validator';

export class RemoveItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  size: number;
}
