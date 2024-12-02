import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { CustomerDemographics } from "./CustomerDemographics";
import { Orders } from "./Orders";

@Index("PK_Customers", ["customerId"], { unique: true })
@Entity("Customers", { schema: "dbo" })
export class Customers {
  @Column("nchar", { primary: true, name: "CustomerID", length: 5 })
  customerId!: string;

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

  @ManyToMany(
    () => CustomerDemographics,
    (customerDemographics) => customerDemographics.customers
  )
  @JoinTable({
    name: "CustomerCustomerDemo",
    joinColumns: [{ name: "CustomerID", referencedColumnName: "customerId" }],
    inverseJoinColumns: [
      { name: "CustomerTypeID", referencedColumnName: "customerTypeId" },
    ],
    schema: "dbo",
  })
  customerDemographics!: CustomerDemographics[];

  @OneToMany(() => Orders, (orders) => orders.customer)
  orders!: Orders[];
}
