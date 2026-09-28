import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CartItem } from "../cart-item/cart-item.entity";
import { AddCartItemDto } from "../cart-item/dto/cart-item.dto";
import { Product } from "../product/product.entity";
import { Cart } from "./cart.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addCartItem(addCartItemDto: AddCartItemDto, userId: string) {
    const cart = await this.cartRepository.findOneBy({
      user: { id: userId },
    });

    if (!cart) {
      throw new Error(`No cart found for user with ID ${userId}`);
    }

    const product = await this.productRepository.findOneBy({
      id: addCartItemDto.productId,
    });

    if (!product) {
      throw new Error(`Product with ID ${addCartItemDto.productId} not found`);
    }

    const existingCartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: cart.id },
        product: { id: product.id },
      },
    });

    if (existingCartItem) {
      existingCartItem.quantity += addCartItemDto.quantity;
      await this.cartItemRepository.save(existingCartItem);
    } else {
      const cartItem = this.cartItemRepository.create({
        cart,
        product,
        quantity: addCartItemDto.quantity,
        unitPrice: product.price,
      });
      await this.cartItemRepository.save(cartItem);
    }

    return this.getCartByUserId(userId);
  }

  async getCartByUserId(id: string) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id } },
      relations: { items: { product: true } },
      select: {
        id: true,
        items: {
          id: true,
          quantity: true,
          unitPrice: true,
          product: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
    if (!cart) {
      throw new Error(`No cart found for user with ID ${id}`);
    }

    const total =
      Math.round(
        cart.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) * 100,
      ) / 100;

    cart.items.forEach((item) => {
      item.product.price = item.unitPrice;
    });

    return { cart, total };
  }

  async getCartById(id: string) {
    const cart = await this.cartRepository.findOneBy({ id });
    if (!cart) {
      throw new Error(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async deleteCart(id: string) {
    const cart = await this.cartRepository.findOneBy({ id });

    if (!cart) {
      throw new Error(`Cart with ID ${id} not found`);
    }

    return await this.cartRepository.remove(cart);
  }
}
