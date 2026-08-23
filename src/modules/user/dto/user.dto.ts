import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  IsOptional,
} from "class-validator";
import { MinAge } from "../user.min-age.validator";
import { Type } from "class-transformer";
import { Role } from "../../../shared/enums/role.enum";

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
  id!: string;
  name!: string;
  lastName!: string;
  email!: string;
  dateOfBirth!: Date;
  role!: Role;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
