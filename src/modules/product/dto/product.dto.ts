import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
  IsArray,
  IsUUID,
  IsInt,
  IsUrl,
} from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";

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

  @IsArray()
  @IsUUID("4", { each: true })
  @IsOptional()
  categoryIds?: string[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductResponseDto {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  imageUrl?: string;
  active!: boolean;
  categories?: { id: string; name: string; slug: string }[];
  createdAt!: Date;
  updatedAt!: Date;
}
