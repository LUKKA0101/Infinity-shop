import {
  IsString,
  IsNotEmpty,
  Length,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsInt,
  IsBoolean,
  IsDate,
  ValidateIf,
} from "class-validator";
import { Type } from "class-transformer";
import { DiscountType } from "../../../shared/enums/discount-type.enum";
import { PartialType } from "@nestjs/mapped-types";

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  code!: string;

  @IsEnum(DiscountType)
  @IsNotEmpty()
  discountType!: DiscountType;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  @ValidateIf(
    (o: CreateCouponDto) => o.discountType === DiscountType.PERCENTAGE,
  )
  @Max(100, {
    message:
      "discountValue não pode passar de 100 quando discountType é PERCENTAGE",
  })
  discountValue!: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  expiresAt!: Date;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  maxUses!: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}

export class ValidateCouponDto {
  @IsString()
  @IsNotEmpty()
  code!: string;
}
