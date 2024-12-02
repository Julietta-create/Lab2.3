import { Column, Entity, Index, ManyToMany } from "typeorm";
import { Customers } from "./Customers";

@Index("PK_CustomerDemographics", ["customerTypeId"], { unique: true })
@Entity("CustomerDemographics", { schema: "dbo" })
export class CustomerDemographics {
  @Column("nchar", { primary: true, name: "CustomerTypeID", length: 10 })
  customerTypeId!: string;

  @Column("ntext", { name: "CustomerDesc", nullable: true })
  customerDesc!: string | null;

  @ManyToMany(() => Customers, (customers) => customers.customerDemographics)
  customers!: Customers[];
}
