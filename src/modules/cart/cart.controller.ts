import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AuthGuard } from "../../middlewares/auth.guard";
import type { AuthenticatedRequest } from "../../types/express";
import { AddCartItemDto } from "../cart-item/dto/cart-item.dto";
import { CartService } from "./cart.service";

@UseGuards(AuthGuard)
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("items")
  async addCartItem(
    @Body() addCartItemDto: AddCartItemDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.cartService.addCartItem(addCartItemDto, req.user.id);
  }

  @Get()
  async getMyCart(@Req() req: AuthenticatedRequest) {
    return await this.cartService.getCartByUserId(req.user.id);
  }

  @Get(":id")
  async getCartById(@Param("id") id: string) {
    return await this.cartService.getCartById(id);
  }

  @Delete(":id")
  async deleteCart(@Param("id") id: string) {
    return await this.cartService.deleteCart(id);
  }
}
