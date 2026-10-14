import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AuthGuard } from "../../middlewares/auth.guard";
import type { AuthenticatedRequest } from "../../types/express";
import { AddressService } from "./address.service";
import { CreateAddressDto, UpdateAddressDto } from "./dto/address.dto";

@UseGuards(AuthGuard)
@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post("/create")
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return await this.addressService.createAddress(
      createAddressDto,
      request.user.id,
    );
  }

  //----------------

  @Get("/user")
  async getAddressByUserId(@Req() request: AuthenticatedRequest) {
    return await this.addressService.getAddressByUserId(request.user.id);
  }
  //-----------------

  @Get(":id")
  async getAddressUsedById(
    @Param("id") id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return await this.addressService.getAddressUsedById(id, request.user.id);
  }

  //-----------------

  @Patch(":id")
  async updateAddress(
    @Param("id") id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return await this.addressService.updateAddress(
      id,
      updateAddressDto,
      request.user.id,
    );
  }

  //-----------------

  @Patch("/default/:id")
  async setDefaultAddress(
    @Param("id") id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    await this.addressService.updateDefaultAddress(id, request.user.id);
  }

  //-----------------

  @Patch("/delete/:id")
  async deleteAddress(
    @Param("id") id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    await this.addressService.deleteAddress(id, request.user.id);
  }
}
