import { Type } from "class-transformer";
import { IsArray, IsInt, IsUUID, Min, ValidateNested } from "class-validator";

import { CartItemResponseDto } from "../../cart-item/dto/cart-item.dto";

class CartItemInput {
  @IsUUID()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemInput)
  items!: CartItemInput[];
}

export class CartResponseDto {
  id!: string;
  items!: CartItemResponseDto[];
  createdAt!: Date;
  updatedAt!: Date;
  total!: number;
}
