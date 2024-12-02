import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Index("PK_Employees", ["employeeId"], { unique: true })
@Entity("Employees", { schema: "dbo" })
export class Employees {
  @PrimaryGeneratedColumn({ type: "int", name: "EmployeeID" })
  employeeId!: number;

  @Column("nvarchar", { name: "LastName", length: 20 })
  lastName!: string;

  @Column("nvarchar", { name: "FirstName", length: 10 })
  firstName!: string;

  @Column("nvarchar", { name: "Title", nullable: true, length: 30 })
  title!: string | null;

  @Column("nvarchar", { name: "TitleOfCourtesy", nullable: true, length: 25 })
  titleOfCourtesy!: string | null;

  @Column("datetime", { name: "BirthDate", nullable: true })
  birthDate!: Date | null;

  @Column("datetime", { name: "HireDate", nullable: true })
  hireDate!: Date | null;

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

  @Column("nvarchar", { name: "HomePhone", nullable: true, length: 24 })
  homePhone!: string | null;

  @Column("nvarchar", { name: "Extension", nullable: true, length: 4 })
  extension!: string | null;

  @Column("image", { name: "Photo", nullable: true })
  photo!: Buffer | null;

  @Column("ntext", { name: "Notes", nullable: true })
  notes!: string | null;

  @Column("nvarchar", { name: "PhotoPath", nullable: true, length: 255 })
  photoPath!: string | null;

  @ManyToOne(() => Employees, (employees) => employees.employees)
  @JoinColumn([{ name: "ReportsTo", referencedColumnName: "employeeId" }])
  reportsTo!: Employees;

  @OneToMany(() => Employees, (employees) => employees.reportsTo)
  employees!: Employees[];

  @OneToMany(() => Orders, (orders) => orders.employee)
  orders!: Orders[];
}
