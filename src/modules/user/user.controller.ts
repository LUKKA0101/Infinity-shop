import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AuthGuard } from "../../middlewares/auth.guard";
import type { AuthenticatedRequest } from "../../types/express";
import { updateUserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { RequestDeleteAccountValidator } from "./validador/request-delete-account.validator";

@UseGuards(AuthGuard)
@Controller("/account")
export class UserControler {
  constructor(
    private readonly userService: UserService,
    private readonly requestDeleteAccountValidator: RequestDeleteAccountValidator,
  ) {}

  @Get("/me")
  async getUser(@Req() request: AuthenticatedRequest) {
    return await this.userService.getUser(request.user.id);
  }

  @Patch("/me")
  async updateUser(
    @Req() request: AuthenticatedRequest,
    @Body() updateDto: updateUserDto,
  ) {
    return await this.userService.updateByUser(request.user.id, updateDto);
  }

  @Delete("/me")
  async requestDeleteAccount(@Req() request: AuthenticatedRequest) {
    return await this.requestDeleteAccountValidator.validateDeleteRequest(
      request.user.id,
    );
  }
}
