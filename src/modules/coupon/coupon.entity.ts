import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

import { DiscountType } from "../../shared/enums/discount-type.enum";

@Entity({ name: "coupon" })
export class Coupon {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "code", length: 30, unique: true, nullable: false })
  code!: string;

  @Column({
    name: "discount_type",
    type: "enum",
    enum: DiscountType,
    nullable: false,
  })
  discountType!: DiscountType;

  @Column({
    name: "discount_value",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  discountValue!: number;

  @Column({ name: "expires_at", type: "timestamp", nullable: false })
  expiresAt!: Date;

  @Column({ name: "max_uses", type: "int", nullable: false })
  maxUses!: number;

  @Column({ name: "used_count", type: "int", nullable: false, default: 0 })
  usedCount!: number;

  @Column({ name: "active", default: true })
  active!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
