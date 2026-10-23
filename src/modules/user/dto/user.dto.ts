import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Exclude, Expose, Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

import { Role } from "../../../shared/enums/role.enum";
import { MinAge } from "../validador/user.min-age.validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
    message:
      "A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial",
  })
  password!: string;

  @Type(() => Date)
  @IsDate()
  @MinAge(16)
  dateOfBirth!: Date;
}

export class updateUserDto extends PartialType(
  OmitType(CreateUserDto, ["password", "email"] as const),
) {}

export class UserResponseDto {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
  @Expose()
  lastName!: string;
  @Expose()
  email!: string;
  @Exclude()
  password!: string;
  @Expose()
  dateOfBirth!: Date;
  @Expose()
  role!: Role;
  @Expose()
  isActive!: boolean;
  @Expose()
  createdAt!: Date;
  @Expose()
  updatedAt!: Date;
}
