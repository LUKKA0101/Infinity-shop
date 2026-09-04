import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "../order/order.entity";
import { Product } from "../product/product.entity";

@Entity({ name: "order_item" })
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Order, (order) => order.items, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.id, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ name: "quantity", type: "int", nullable: false })
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
