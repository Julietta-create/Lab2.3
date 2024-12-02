import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAgeToCustomer1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "Customer",
      new TableColumn({
        name: "age",
        type: "int",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("Customer", "age");
  }
}
