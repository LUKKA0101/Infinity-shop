import { Type } from "class-transformer";
import { IsInt, IsOptional, IsUUID, Min } from "class-validator";

export class AddCartItemDto {
  @IsUUID()
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
