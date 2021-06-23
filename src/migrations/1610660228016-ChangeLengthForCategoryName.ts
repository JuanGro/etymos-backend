import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeLengthForCategoryName1610660228016
implements MigrationInterface {
  name = 'ChangeLengthForCategoryName1610660228016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"',
    );
    await queryRunner.query('ALTER TABLE "category" DROP COLUMN "name"');
    await queryRunner.query(
      'ALTER TABLE "category" ADD "name" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"',
    );
    await queryRunner.query('ALTER TABLE "category" DROP COLUMN "name"');
    await queryRunner.query(
      'ALTER TABLE "category" ADD "name" character varying(16) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")',
    );
  }
}
