import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { CreateUserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller("/user")
export class UserControler {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
