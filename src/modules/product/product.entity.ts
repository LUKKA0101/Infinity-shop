import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "../category/category.entity";

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "name", length: 120, nullable: false })
  name!: string;

  @Column({ name: "description", type: "text", nullable: false })
  description!: string;

  @Column({
    name: "price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price!: number;

  @Column({ name: "stock", type: "int", nullable: false, default: 0 })
  stock!: number;

  @Column({ name: "image_url", type: "text", nullable: true })
  imageUrl?: string;

  @Column({ name: "active", default: true })
  active!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date | null;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({ name: "product_category" })
  categories!: Category[];
}
