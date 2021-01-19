import { IsNumber } from "class-validator";

export class AddBucketDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  count: number;

  @IsNumber()
  size: number;
}
