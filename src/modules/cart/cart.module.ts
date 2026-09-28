import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CartItem } from "../cart-item/cart-item.entity";
import { Product } from "../product/product.entity";
import { CartController } from "./cart.controller";
import { Cart } from "./cart.entity";
import { CartService } from "./cart.service";

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Product])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
