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
import { Suppliers } from "./Suppliers";
import { Categories } from "./Categories";

@Index("PK_Products", ["productId"], { unique: true })
@Entity("Products", { schema: "dbo" })
export class Products {
  @PrimaryGeneratedColumn({ type: "int", name: "ProductID" })
  productId!: number;

  @Column("nvarchar", { name: "ProductName", length: 40 })
  productName!: string;

  @Column("nvarchar", { name: "QuantityPerUnit", nullable: true, length: 20 })
  quantityPerUnit!: string | null;

  @Column("money", { name: "UnitPrice", nullable: true, default: () => "(0)" })
  unitPrice!: number | null;

  @Column("smallint", {
    name: "UnitsInStock",
    nullable: true,
    default: () => "(0)",
  })
  unitsInStock!: number | null;

  @Column("smallint", {
    name: "UnitsOnOrder",
    nullable: true,
    default: () => "(0)",
  })
  unitsOnOrder!: number | null;

  @Column("smallint", {
    name: "ReorderLevel",
    nullable: true,
    default: () => "(0)",
  })
  reorderLevel!: number | null;

  @Column("bit", { name: "Discontinued", default: () => "(0)" })
  discontinued!: boolean;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
  orderDetails!: OrderDetails[];

  @ManyToOne(() => Suppliers, (suppliers) => suppliers.products)
  @JoinColumn([{ name: "SupplierID", referencedColumnName: "supplierId" }])
  supplier!: Suppliers;

  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn([{ name: "CategoryID", referencedColumnName: "categoryId" }])
  category!: Categories;
}
