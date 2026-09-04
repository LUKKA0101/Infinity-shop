import {
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  Min,
} from "class-validator";
import { Type } from "class-transformer";
import { OrderStatus } from "../../../shared/enums/order-status.enum";
import { CreateOrderItemDto } from "../../order-item/dto/order-item.dto";
import { AddressResponseDto } from "../../address/dto/address.dto";

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  addressId!: string;

  @IsArray()
  @ArrayMinSize(1, { message: "o pedido deve ter pelo menos um item" })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  shippingCost?: number = 0;
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status!: OrderStatus;
}

export class OrderResponseDto {
  id!: string;
  userId!: string;
  address!: AddressResponseDto;
  items!: OrderItemResponseDto[];
  payment?: PaymentResponseDto;
  status!: OrderStatus;
  shippingCost!: number;
  total!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

export class OrderItemResponseDto {
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

export class PaymentResponseDto {
  id!: string;
  method!: string;
  status!: string;
  amount!: number;
  paidAt?: Date;
}
