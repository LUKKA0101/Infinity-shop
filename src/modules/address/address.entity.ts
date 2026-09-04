import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "../user/user.entity";

@Entity({ name: "address" })
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.address, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "street", type: "text", nullable: false })
  street!: string;

  @Column({ name: "number", length: 20, nullable: false })
  number!: string;

  @Column({ name: "complement", length: 60, nullable: true })
  complement?: string;

  @Column({ name: "neighborhood", length: 50, nullable: false })
  neighborhood!: string;

  @Column({ name: "city", length: 40, nullable: false })
  city!: string;

  @Column({ name: "state", length: 2, nullable: false })
  state!: string;

  @Column({ name: "zip_code", length: 9, nullable: false })
  zipCode!: string;

  @Column({ name: "is_default", default: false })
  isDefault!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
