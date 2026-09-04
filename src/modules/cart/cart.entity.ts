import {
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { User } from "../user/user.entity";
import { CartItem } from "../cart-item/cart-item.entity";

@Entity({ name: "cart" })
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items!: CartItem[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
