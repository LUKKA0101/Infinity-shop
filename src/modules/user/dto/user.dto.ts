import { Exclude, Expose, Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

import { Role } from "../../../shared/enums/role.enum";
import { MinAge } from "../user.min-age.validator";

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

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(1, 70)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(1, 70)
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
    message:
      "A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial",
  })
  password?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @MinAge(16)
  dateOfBirth?: Date;
}

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
  isActive!: boolean;
  @Expose()
  createdAt!: Date;
  updatedAt!: Date;
}
