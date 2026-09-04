import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";

import { PaymentMethod } from "../../../shared/enums/payment-method.enum";
import { PaymentStatus } from "../../../shared/enums/payment-status.enum";

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  orderId!: string;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method!: PaymentMethod;
}

export class UpdatePaymentStatusDto {
  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  status!: PaymentStatus;
}

export class PaymentResponseDto {
  id!: string;
  orderId!: string;
  method!: PaymentMethod;
  status!: PaymentStatus;
  amount!: number;
  paidAt?: Date;
  createdAt!: Date;
}
