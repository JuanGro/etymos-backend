import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoinTableForOptionTable1610758087015
  implements MigrationInterface
{
  name = "AddJoinTableForOptionTable1610758087015";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "option_tests_test" ("optionId" integer NOT NULL, "testId" integer NOT NULL, CONSTRAINT "PK_d92aef8d6e8a4c0358248cf53c3" PRIMARY KEY ("optionId", "testId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a6bc23d252ccda089dfb34f759" ON "option_tests_test" ("optionId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8dbaa8dbc7d43325150039808" ON "option_tests_test" ("testId") `
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" DROP CONSTRAINT "UQ_44298628bffb9b991f432d0a68a"`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" DROP COLUMN "target"`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" ADD "target" character varying(16) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" ADD CONSTRAINT "UQ_44298628bffb9b991f432d0a68a" UNIQUE ("target")`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" DROP COLUMN "replacement"`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" ADD "replacement" character varying(16) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "option_tests_test" ADD CONSTRAINT "FK_a6bc23d252ccda089dfb34f7590" FOREIGN KEY ("optionId") REFERENCES "option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "option_tests_test" ADD CONSTRAINT "FK_e8dbaa8dbc7d433251500398081" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "option_tests_test" DROP CONSTRAINT "FK_e8dbaa8dbc7d433251500398081"`
    );
    await queryRunner.query(
      `ALTER TABLE "option_tests_test" DROP CONSTRAINT "FK_a6bc23d252ccda089dfb34f7590"`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" DROP COLUMN "replacement"`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" ADD "replacement" character varying(8) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" DROP CONSTRAINT "UQ_44298628bffb9b991f432d0a68a"`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" DROP COLUMN "target"`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" ADD "target" character varying(8) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "wrong_option_rule" ADD CONSTRAINT "UQ_44298628bffb9b991f432d0a68a" UNIQUE ("target")`
    );
    await queryRunner.query(`DROP INDEX "IDX_e8dbaa8dbc7d43325150039808"`);
    await queryRunner.query(`DROP INDEX "IDX_a6bc23d252ccda089dfb34f759"`);
    await queryRunner.query(`DROP TABLE "option_tests_test"`);
  }
}
