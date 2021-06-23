import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeTargetAndReplacementLength1610754966049
implements MigrationInterface {
  name = 'ChangeTargetAndReplacementLength1610754966049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" DROP CONSTRAINT "UQ_44298628bffb9b991f432d0a68a"',
    );
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" DROP COLUMN "target"',
    );
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" ADD "target" character varying(16) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" ADD CONSTRAINT "UQ_44298628bffb9b991f432d0a68a" UNIQUE ("target")',
    );
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" DROP COLUMN "replacement"',
    );
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" ADD "replacement" character varying(16) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" DROP COLUMN "replacement"',
    );
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" ADD "replacement" character varying(8) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" DROP CONSTRAINT "UQ_44298628bffb9b991f432d0a68a"',
    );
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" DROP COLUMN "target"',
    );
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" ADD "target" character varying(8) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "wrong_option_rule" ADD CONSTRAINT "UQ_44298628bffb9b991f432d0a68a" UNIQUE ("target")',
    );
  }
}
