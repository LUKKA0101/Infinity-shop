import { Body, Controller, Delete, Get, Param } from "@nestjs/common";

import { UserService } from "./user.service";

@Controller("/user")
export class UserControler {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
