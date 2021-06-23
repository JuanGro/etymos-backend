import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RefactorMER1616566526215 implements MigrationInterface {
  name = 'RefactorMER1616566526215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "question" DROP CONSTRAINT "FK_3ae8cf4dd97d0a48d31ba096e27"',
    );
    await queryRunner.query(
      'CREATE TABLE "language" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7df7d1e250ea2a416f078a631fb" UNIQUE ("name"), CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "etymology_type" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, "description" character varying(128) NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bf1465b54a65c1bfa4dc1487479" UNIQUE ("name"), CONSTRAINT "PK_27b660a3217a8ab3ec2e20e0a82" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "option_questions_question" ("optionId" integer NOT NULL, "questionId" integer NOT NULL, CONSTRAINT "PK_34f532ed7cf7d01757406b1c7bf" PRIMARY KEY ("optionId", "questionId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_c0231b1e0ce22bdc98d5b9a4b7" ON "option_questions_question" ("optionId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_ce16ae3c66ff24171e486fb293" ON "option_questions_question" ("questionId") ',
    );
    await queryRunner.query('ALTER TABLE "question" DROP COLUMN "optionId"');
    await queryRunner.query('ALTER TABLE "etymology" DROP COLUMN "type"');
    await queryRunner.query('ALTER TABLE "etymology" DROP COLUMN "language"');
    await queryRunner.query(
      'ALTER TABLE "test" ADD "correct" boolean NOT NULL DEFAULT false',
    );
    await queryRunner.query('ALTER TABLE "test" ADD "questionId" integer');
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "etymologyTypeId" integer',
    );
    await queryRunner.query('ALTER TABLE "etymology" ADD "languageId" integer');
    await queryRunner.query(
      'ALTER TABLE "category" ADD "description" character varying(128) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "version" ADD "description" character varying(1024) NOT NULL',
    );
    await queryRunner.query('COMMENT ON COLUMN "version"."version" IS NULL');
    await queryRunner.query(
      'ALTER TABLE "version" ADD CONSTRAINT "UQ_efaf48ac3246f46e661a338640a" UNIQUE ("version")',
    );
    await queryRunner.query(
      'ALTER TABLE "test" ADD CONSTRAINT "FK_e43c3495d82ed607c8d7ea8bfd6" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD CONSTRAINT "FK_b03117e933a73e7976c2a7318b7" FOREIGN KEY ("etymologyTypeId") REFERENCES "etymology_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD CONSTRAINT "FK_2d5796e271f4cd360ef6528dd06" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "option_questions_question" ADD CONSTRAINT "FK_c0231b1e0ce22bdc98d5b9a4b72" FOREIGN KEY ("optionId") REFERENCES "option"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "option_questions_question" ADD CONSTRAINT "FK_ce16ae3c66ff24171e486fb2939" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "option_questions_question" DROP CONSTRAINT "FK_ce16ae3c66ff24171e486fb2939"',
    );
    await queryRunner.query(
      'ALTER TABLE "option_questions_question" DROP CONSTRAINT "FK_c0231b1e0ce22bdc98d5b9a4b72"',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" DROP CONSTRAINT "FK_2d5796e271f4cd360ef6528dd06"',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" DROP CONSTRAINT "FK_b03117e933a73e7976c2a7318b7"',
    );
    await queryRunner.query(
      'ALTER TABLE "test" DROP CONSTRAINT "FK_e43c3495d82ed607c8d7ea8bfd6"',
    );
    await queryRunner.query(
      'ALTER TABLE "version" DROP CONSTRAINT "UQ_efaf48ac3246f46e661a338640a"',
    );
    await queryRunner.query('COMMENT ON COLUMN "version"."version" IS NULL');
    await queryRunner.query('ALTER TABLE "version" DROP COLUMN "description"');
    await queryRunner.query('ALTER TABLE "category" DROP COLUMN "description"');
    await queryRunner.query('ALTER TABLE "etymology" DROP COLUMN "languageId"');
    await queryRunner.query(
      'ALTER TABLE "etymology" DROP COLUMN "etymologyTypeId"',
    );
    await queryRunner.query('ALTER TABLE "test" DROP COLUMN "questionId"');
    await queryRunner.query('ALTER TABLE "test" DROP COLUMN "correct"');
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "language" character varying(64) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "type" character varying(16) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "question" ADD "optionId" integer');
    await queryRunner.query('DROP INDEX "IDX_ce16ae3c66ff24171e486fb293"');
    await queryRunner.query('DROP INDEX "IDX_c0231b1e0ce22bdc98d5b9a4b7"');
    await queryRunner.query('DROP TABLE "option_questions_question"');
    await queryRunner.query('DROP TABLE "etymology_type"');
    await queryRunner.query('DROP TABLE "language"');
    await queryRunner.query(
      'ALTER TABLE "question" ADD CONSTRAINT "FK_3ae8cf4dd97d0a48d31ba096e27" FOREIGN KEY ("optionId") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
