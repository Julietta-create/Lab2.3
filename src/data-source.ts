
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categories } from "./entity/entities/Categories"; 
import { CustomerDemographics } from "./entity/entities/CustomerDemographics";
import { Customers } from "./entity/entities/Customers";
import { Employees } from "./entity/entities/Employees";
import { EmployeeTerritories } from "./entity/entities/EmployeeTerritories";
import { OrderDetails } from "./entity/entities/OrderDetails";
import { Orders } from "./entity/entities/Orders";
import { Products } from "./entity/entities/Products";
import { Region } from "./entity/entities/Region";
import { Shippers } from "./entity/entities/Shippers";
import { Suppliers } from "./entity/entities/Suppliers";
import { Territories } from "./entity/entities/Territories";
import { TestIndex } from "./entity/entities/TestIndex";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST || "localhost",
  port: 1433,
  username: process.env.DB_USERNAME || "sa",
  password: process.env.DB_PASSWORD || "12345678",
  database: process.env.DB_DATABASE || "Northwind",
  synchronize: false, 
  logging: false,
  entities: [Categories, CustomerDemographics, Customers, Employees, EmployeeTerritories, OrderDetails, Orders, Products, Region, Shippers, Suppliers, Territories, TestIndex],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
});
