import { Body, Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { CreateUserDto } from "../user/dto/user.dto";
import { UserResponseDto } from "../user/dto/user.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async registerUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.authService.signUp(dto);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post("/signin")
  async loginUser(@Body() dto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(dto.email);
  }
}
