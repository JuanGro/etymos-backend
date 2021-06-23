import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeLengthForQuestionSentence1610753323945
implements MigrationInterface {
  name = 'ChangeLengthForQuestionSentence1610753323945';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "question" DROP CONSTRAINT "UQ_c179132315228cb3cff65ffcfd0"',
    );
    await queryRunner.query('ALTER TABLE "question" DROP COLUMN "sentence"');
    await queryRunner.query(
      'ALTER TABLE "question" ADD "sentence" character varying(2048) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "question" ADD CONSTRAINT "UQ_c179132315228cb3cff65ffcfd0" UNIQUE ("sentence")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "question" DROP CONSTRAINT "UQ_c179132315228cb3cff65ffcfd0"',
    );
    await queryRunner.query('ALTER TABLE "question" DROP COLUMN "sentence"');
    await queryRunner.query(
      'ALTER TABLE "question" ADD "sentence" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "question" ADD CONSTRAINT "UQ_c179132315228cb3cff65ffcfd0" UNIQUE ("sentence")',
    );
  }
}
