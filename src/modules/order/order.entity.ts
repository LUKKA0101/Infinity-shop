import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { OrderStatus } from "../../shared/enums/order-status.enum";
import { Address } from "../address/address.entity";
import { OrderItem } from "../order-item/order-item.entity";
import { Payment } from "../payment/payment.entity";
import { User } from "../user/user.entity";

@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Address, (address) => address.id, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "address_id" })
  address!: Address;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items!: OrderItem[];

  @OneToOne(() => Payment, (payment) => payment.order)
  payment?: Payment;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @Column({
    name: "shipping_cost",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  shippingCost!: number;

  @Column({
    name: "total",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  total!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
