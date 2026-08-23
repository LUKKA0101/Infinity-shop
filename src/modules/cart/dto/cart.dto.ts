import { CartItemResponseDto } from "../../cart-item/dto/cart-item.dto";

export class CartResponseDto {
  id!: string;
  items!: CartItemResponseDto[];
  createdAt!: Date;
  updatedAt!: Date;
  total!: number;
}
