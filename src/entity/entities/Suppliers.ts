import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";

@Index("PK_Suppliers", ["supplierId"], { unique: true })
@Entity("Suppliers", { schema: "dbo" })
export class Suppliers {
  @PrimaryGeneratedColumn({ type: "int", name: "SupplierID" })
  supplierId!: number;

  @Column("nvarchar", { name: "CompanyName", length: 40 })
  companyName!: string;

  @Column("nvarchar", { name: "ContactName", nullable: true, length: 30 })
  contactName!: string | null;

  @Column("nvarchar", { name: "ContactTitle", nullable: true, length: 30 })
  contactTitle!: string | null;

  @Column("nvarchar", { name: "Address", nullable: true, length: 60 })
  address!: string | null;

  @Column("nvarchar", { name: "City", nullable: true, length: 15 })
  city!: string | null;

  @Column("nvarchar", { name: "Region", nullable: true, length: 15 })
  region!: string | null;

  @Column("nvarchar", { name: "PostalCode", nullable: true, length: 10 })
  postalCode!: string | null;

  @Column("nvarchar", { name: "Country", nullable: true, length: 15 })
  country!: string | null;

  @Column("nvarchar", { name: "Phone", nullable: true, length: 24 })
  phone!: string | null;

  @Column("nvarchar", { name: "Fax", nullable: true, length: 24 })
  fax!: string | null;

  @Column("ntext", { name: "HomePage", nullable: true })
  homePage!: string | null;

  @OneToMany(() => Products, (products) => products.supplier)
  products!: Products[];
}
