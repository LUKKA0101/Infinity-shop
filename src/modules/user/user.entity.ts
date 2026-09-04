import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Role } from "../../shared/enums/role.enum";
import { Address } from "../address/address.entity";
import { Cart } from "../cart/cart.entity";
import { Order } from "../order/order.entity";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "name", length: 70, nullable: false })
  name!: string;

  @Column({ name: "last_name", length: 70, nullable: false })
  lastName!: string;

  @Column({ name: "email", length: 60, nullable: false, unique: true })
  email!: string;

  @Column({ name: "password", nullable: false, select: false })
  password!: string;

  @Column({ name: "date_of_birth", type: "date", nullable: false })
  dateOfBirth!: Date;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.CLIENT,
  })
  role!: Role;

  @OneToMany(() => Address, (address) => address.user)
  address!: Address[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart?: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date | null;
}
