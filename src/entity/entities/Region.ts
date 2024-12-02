import { Column, Entity, Index, OneToMany } from "typeorm";
import { Territories } from "./Territories";

@Index("PK_Region", ["regionId"], { unique: true })
@Entity("Region", { schema: "dbo" })
export class Region {
  @Column("int", { primary: true, name: "RegionID" })
  regionId!: number;

  @Column("nchar", { name: "RegionDescription", length: 50 })
  regionDescription!: string;

  @OneToMany(() => Territories, (territories) => territories.region)
  territories!: Territories[];
}
