import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";

@Index("PK_Categories", ["categoryId"], { unique: true })
@Entity("Categories", { schema: "dbo" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "int", name: "CategoryID" })
  categoryId!: number;

  @Column("nvarchar", { name: "CategoryName", length: 15 })
  categoryName!: string;

  @Column("ntext", { name: "Description", nullable: true })
  description!: string | null;

  @Column("image", { name: "Picture", nullable: true })
  picture!: Buffer | null;

  @OneToMany(() => Products, (products) => products.category)
  products!: Products[];
}
