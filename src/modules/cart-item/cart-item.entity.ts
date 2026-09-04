import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "../cart/cart.entity";
import { Product } from "../product/product.entity";

@Entity({ name: "cart_item" })
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Cart, (cart) => cart.items, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "cart_id" })
  cart!: Cart;

  @ManyToOne(() => Product, (product) => product.id, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "product_id" })
  productId!: Product;

  @Column({ name: "quantity", type: "int", nullable: false, default: 1 })
  quantity!: number;

  @Column({
    name: "unit_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  unitPrice!: number;
}
