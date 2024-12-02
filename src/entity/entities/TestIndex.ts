import { Column, Entity, Index } from "typeorm";

@Index("idx_cl_pid", ["id"], {})
@Index("idx_ncl_pole1", ["pole1"], {})
@Entity("test_index", { schema: "dbo" })
export class TestIndex {
  @Column("int", { name: "id", primary: true })
  id!: number;

  @Column("char", { name: "pole1", length: 36 })
  pole1!: string;

  @Column("char", { name: "pole2", length: 216 })
  pole2!: string;
}
