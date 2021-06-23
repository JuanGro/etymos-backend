import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeTestRelations1609955318546 implements MigrationInterface {
  name = 'ChangeTestRelations1609955318546';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "question" ADD "optionId" integer');
    await queryRunner.query(
      'ALTER TABLE "option" ADD "wrongOptionRuleId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "question" ADD CONSTRAINT "FK_3ae8cf4dd97d0a48d31ba096e27" FOREIGN KEY ("optionId") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "option" ADD CONSTRAINT "FK_767f7f8e521c1c6991d3bf884ad" FOREIGN KEY ("wrongOptionRuleId") REFERENCES "wrong_option_rule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "option" DROP CONSTRAINT "FK_767f7f8e521c1c6991d3bf884ad"',
    );
    await queryRunner.query(
      'ALTER TABLE "question" DROP CONSTRAINT "FK_3ae8cf4dd97d0a48d31ba096e27"',
    );
    await queryRunner.query(
      'ALTER TABLE "option" DROP COLUMN "wrongOptionRuleId"',
    );
    await queryRunner.query('ALTER TABLE "question" DROP COLUMN "optionId"');
  }
}
