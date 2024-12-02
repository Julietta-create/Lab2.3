import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Index("PK_Shippers", ["shipperId"], { unique: true })
@Entity("Shippers", { schema: "dbo" })
export class Shippers {
  @PrimaryGeneratedColumn({ type: "int", name: "ShipperID" })
  shipperId!: number;

  @Column("nvarchar", { name: "CompanyName", length: 40 })
  companyName!: string;

  @Column("nvarchar", { name: "Phone", nullable: true, length: 24 })
  phone!: string | null;

  @OneToMany(() => Orders, (orders) => orders.shipVia)
  orders!: Orders[];
}
