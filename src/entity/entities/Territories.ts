import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { EmployeeTerritories } from "./EmployeeTerritories";
import { Region } from "./Region";

@Index("PK_Territories", ["territoryId"], { unique: true })
@Entity("Territories", { schema: "dbo" })
export class Territories {
  @Column("nvarchar", { primary: true, name: "TerritoryID", length: 20 })
  territoryId!: string;

  @Column("nchar", { name: "TerritoryDescription", length: 50 })
  territoryDescription!: string;

  @OneToMany(
    () => EmployeeTerritories,
    (employeeTerritories) => employeeTerritories.territory
  )
  employeeTerritories!: EmployeeTerritories[];

  @ManyToOne(() => Region, (region) => region.territories)
  @JoinColumn([{ name: "RegionID", referencedColumnName: "regionId" }])
  region!: Region;
}
