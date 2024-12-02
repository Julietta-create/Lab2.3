import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Orders } from "./Orders";
import { Products } from "./Products";

@Index("PK_Order_Details", ["orderId", "productId"], { unique: true })
@Entity("Order Details", { schema: "dbo" })
export class OrderDetails {
  @Column("int", { primary: true, name: "OrderID" })
  orderId!: number;

  @Column("int", { primary: true, name: "ProductID" })
  productId!: number;

  @Column("money", { name: "UnitPrice", default: () => "(0)" })
  unitPrice!: number;

  @Column("smallint", { name: "Quantity", default: () => "(1)" })
  quantity!: number;

  @Column("real", { name: "Discount", precision: 24, default: () => "(0)" })
  discount!: number;

  @ManyToOne(() => Orders, (orders) => orders.orderDetails)
  @JoinColumn([{ name: "OrderID", referencedColumnName: "orderId" }])
  order!: Orders;

  @ManyToOne(() => Products, (products) => products.orderDetails)
  @JoinColumn([{ name: "ProductID", referencedColumnName: "productId" }])
  product!: Products;
}
