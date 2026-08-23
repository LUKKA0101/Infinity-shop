import { IsNotEmpty, IsUUID, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateOrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  productId!: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity!: number;
}

export class OrderItemResponseDto {
  id!: string;
  orderId!: string;
  productId!: string;
  quantity!: number;
  unitPrice!: number;
  product?: {
    id: string;
    name: string;
    imageUrl?: string;
  };
}
