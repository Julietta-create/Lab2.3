import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Territories } from "./Territories";

@Index("PK_EmployeeTerritories", ["employeeId", "territoryId"], {
  unique: true,
})
@Entity("EmployeeTerritories", { schema: "dbo" })
export class EmployeeTerritories {
  @Column("int", { primary: true, name: "EmployeeID" })
  employeeId!: number;

  @Column("nvarchar", { primary: true, name: "TerritoryID", length: 20 })
  territoryId!: string;

  @ManyToOne(
    () => Territories,
    (territories) => territories.employeeTerritories
  )
  @JoinColumn([{ name: "TerritoryID", referencedColumnName: "territoryId" }])
  territory!: Territories;
}
