import { PartialType } from "@nestjs/mapped-types";
import { Expose, Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Min,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 5000)
  description!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price!: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  stock?: number = 0;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean = true;

  @IsUUID("4")
  @IsOptional()
  categoryId?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductResponseDto {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
  @Expose()
  description!: string;
  @Expose()
  price!: number;
  @Expose()
  stock!: number;
  @Expose()
  imageUrl?: string;
  @Expose()
  active!: boolean;
  @Expose()
  category?: { id: string; name: string; slug: string };
  @Expose()
  createdAt!: Date;
  updatedAt!: Date;
}
