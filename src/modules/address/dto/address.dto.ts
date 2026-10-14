import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Expose } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  street!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  number!: string;

  @IsOptional()
  @IsString()
  @Length(1, 60)
  complement?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  neighborhood!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 40)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/, {
    message: "state must be the uppercase abbreviation of the state (e.g., RJ)",
  })
  state!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}-?\d{3}$/, {
    message: "zipCode must be in the format 00000-000 or 00000000",
  })
  zipCode!: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

export class UpdateAddressDto extends PartialType(
  OmitType(CreateAddressDto, ["isDefault"] as const),
) {}

/**
 * Expose() is used to mark the fields that should be included in the response.
 * Fields without Expose() will not appear in the API response.
 */
export class AddressResponseDto {
  @Expose()
  id!: string;
  @Expose()
  userId!: string;
  @Expose()
  street!: string;
  @Expose()
  number!: string;
  @Expose()
  complement?: string;
  @Expose()
  neighborhood!: string;
  @Expose()
  city!: string;
  @Expose()
  state!: string;
  @Expose()
  zipCode!: string;
  @Expose()
  isDefault!: boolean;
  @Expose()
  createdAt!: Date;
  @Expose()
  updatedAt!: Date;
}
