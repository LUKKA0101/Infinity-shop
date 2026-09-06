import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  name!: string;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  description?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
