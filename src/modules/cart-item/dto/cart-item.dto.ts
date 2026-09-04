import { IsUUID, IsNotEmpty, IsInt, Min, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateCartItemDto {
  @IsUUID()
  @IsNotEmpty()
  productId!: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity!: number;
}

export class UpdateCartItemDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  quantity?: number;
}

export class CartItemResponseDto {
  id!: string;
  productId!: string;
  quantity!: number;
  unitPrice!: number;
  product?: {
    id: string;
    name: string;
    imageUrl?: string;
  };
}
