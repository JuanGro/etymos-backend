import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelations1609902709018 implements MigrationInterface {
  name = "AddRelations1609902709018";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "reference"."title" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "reference" ADD CONSTRAINT "UQ_9c99fbcdd84247d625bb8e4141d" UNIQUE ("title")`
    );
    await queryRunner.query(`COMMENT ON COLUMN "pattern"."pattern" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "pattern" ADD CONSTRAINT "UQ_6cc9722db178c9a66aa2d19036e" UNIQUE ("pattern")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pattern" DROP CONSTRAINT "UQ_6cc9722db178c9a66aa2d19036e"`
    );
    await queryRunner.query(`COMMENT ON COLUMN "pattern"."pattern" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "reference" DROP CONSTRAINT "UQ_9c99fbcdd84247d625bb8e4141d"`
    );
    await queryRunner.query(`COMMENT ON COLUMN "reference"."title" IS NULL`);
  }
}
