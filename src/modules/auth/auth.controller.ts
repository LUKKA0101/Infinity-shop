import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { CreateUserDto } from "../user/dto/user.dto";
import { UserResponseDto } from "../user/dto/user.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/sign-up")
  async registerUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.authService.signUp(dto);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post("/sign-in")
  async loginUser(@Body() dto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(dto.email, dto.password);
  }

  @Get("/confirmar")
  async confirmEmail(@Query("token") token: string) {
    return this.authService.confirmEmail(token);
  }
}
