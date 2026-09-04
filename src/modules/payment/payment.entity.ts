import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { PaymentMethod } from "../../shared/enums/payment-method.enum";
import { PaymentStatus } from "../../shared/enums/payment-status.enum";
import { Order } from "../order/order.entity";

@Entity({ name: "payment" })
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Order, (order) => order.payment, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @Column({
    type: "enum",
    enum: PaymentMethod,
    nullable: false,
  })
  method!: PaymentMethod;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column({
    name: "amount",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount!: number;

  @Column({ name: "paid_at", type: "timestamp", nullable: true })
  paidAt!: Date | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
