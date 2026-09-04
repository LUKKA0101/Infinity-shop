import { OmitType, PartialType } from "@nestjs/mapped-types";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateIf,
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

  @IsString()
  @Length(1, 60)
  @ValidateIf(
    (o: CreateAddressDto) => o.complement !== undefined && o.complement !== "",
  )
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
    message: "state deve ser a sigla da UF em maiúsculas (ex: RJ)",
  })
  state!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}-?\d{3}$/, {
    message: "zipCode deve estar no formato 00000-000 ou 00000000",
  })
  zipCode!: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

export class UpdateAddressDto extends PartialType(
  OmitType(CreateAddressDto, ["isDefault"] as const),
) {}

export class AddressResponseDto {
  id!: string;
  userId!: string;
  street!: string;
  number!: string;
  complement?: string;
  neighborhood!: string;
  city!: string;
  state!: string;
  zipCode!: string;
  isDefault!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
