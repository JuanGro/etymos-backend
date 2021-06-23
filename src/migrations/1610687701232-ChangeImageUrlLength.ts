import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeImageUrlLength1610687701232 implements MigrationInterface {
  name = 'ChangeImageUrlLength1610687701232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "etymology" DROP COLUMN "imageUrl"');
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "imageUrl" character varying(2048) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "word" DROP COLUMN "imageUrl"');
    await queryRunner.query(
      'ALTER TABLE "word" ADD "imageUrl" character varying(2048) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "word" DROP COLUMN "imageUrl"');
    await queryRunner.query(
      'ALTER TABLE "word" ADD "imageUrl" character varying(256) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "etymology" DROP COLUMN "imageUrl"');
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "imageUrl" character varying(256) NOT NULL',
    );
  }
}
