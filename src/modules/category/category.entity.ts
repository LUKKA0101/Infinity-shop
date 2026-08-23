import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "../product/product.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "name", length: 30, unique: true })
  name!: string;

  @Column({ name: "slug", length: 40, unique: true })
  slug!: string;

  @Column({ name: "description", type: "text", nullable: true })
  description?: string;

  @OneToMany(() => Product, (product) => product.categories)
  products!: Product[];
}
