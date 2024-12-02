import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { Employees } from "./Employees";
import { Shippers } from "./Shippers";
import { Customers } from "./Customers";

@Index("PK_Orders", ["orderId"], { unique: true })
@Entity("Orders", { schema: "dbo" })
export class Orders {
  @PrimaryGeneratedColumn({ type: "int", name: "OrderID" })
  orderId!: number;

  @Column("datetime", { name: "OrderDate", nullable: true })
  orderDate!: Date | null;

  @Column("datetime", { name: "RequiredDate", nullable: true })
  requiredDate!: Date | null;

  @Column("datetime", { name: "ShippedDate", nullable: true })
  shippedDate!: Date | null;

  @Column("money", { name: "Freight", nullable: true, default: () => "(0)" })
  freight!: number | null;

  @Column("nvarchar", { name: "ShipName", nullable: true, length: 40 })
  shipName!: string | null;

  @Column("nvarchar", { name: "ShipAddress", nullable: true, length: 60 })
  shipAddress!: string | null;

  @Column("nvarchar", { name: "ShipCity", nullable: true, length: 15 })
  shipCity!: string | null;

  @Column("nvarchar", { name: "ShipRegion", nullable: true, length: 15 })
  shipRegion!: string | null;

  @Column("nvarchar", { name: "ShipPostalCode", nullable: true, length: 10 })
  shipPostalCode!: string | null;

  @Column("nvarchar", { name: "ShipCountry", nullable: true, length: 15 })
  shipCountry!: string | null;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails!: OrderDetails[];

  @ManyToOne(() => Employees, (employees) => employees.orders)
  @JoinColumn([{ name: "EmployeeID", referencedColumnName: "employeeId" }])
  employee!: Employees;

  @ManyToOne(() => Shippers, (shippers) => shippers.orders)
  @JoinColumn([{ name: "ShipVia", referencedColumnName: "shipperId" }])
  shipVia!: Shippers;

  @ManyToOne(() => Customers, (customers) => customers.orders)
  @JoinColumn([{ name: "CustomerID", referencedColumnName: "customerId" }])
  customer!: Customers;
}
