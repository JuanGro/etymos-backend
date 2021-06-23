import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeAttributesLength1610754374325 implements MigrationInterface {
  name = 'ChangeAttributesLength1610754374325';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "reference" DROP COLUMN "author"');
    await queryRunner.query(
      'ALTER TABLE "reference" ADD "author" character varying(256) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" DROP CONSTRAINT "UQ_9c99fbcdd84247d625bb8e4141d"',
    );
    await queryRunner.query('ALTER TABLE "reference" DROP COLUMN "title"');
    await queryRunner.query(
      'ALTER TABLE "reference" ADD "title" character varying(256) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" ADD CONSTRAINT "UQ_9c99fbcdd84247d625bb8e4141d" UNIQUE ("title")',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" DROP COLUMN "publicationPlace"',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" ADD "publicationPlace" character varying(256) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" DROP COLUMN "publishingCompany"',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" ADD "publishingCompany" character varying(256) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "option" DROP CONSTRAINT "UQ_9c43523275e2dfe59aa060f553e"',
    );
    await queryRunner.query('ALTER TABLE "option" DROP COLUMN "option"');
    await queryRunner.query(
      'ALTER TABLE "option" ADD "option" character varying(64) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "option" ADD CONSTRAINT "UQ_9c43523275e2dfe59aa060f553e" UNIQUE ("option")',
    );
    await queryRunner.query(
      'ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"',
    );
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "email"');
    await queryRunner.query(
      'ALTER TABLE "user" ADD "email" character varying(256) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")',
    );
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "name"');
    await queryRunner.query(
      'ALTER TABLE "user" ADD "name" character varying(256) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pattern" DROP CONSTRAINT "UQ_6cc9722db178c9a66aa2d19036e"',
    );
    await queryRunner.query('ALTER TABLE "pattern" DROP COLUMN "pattern"');
    await queryRunner.query(
      'ALTER TABLE "pattern" ADD "pattern" character varying(16) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pattern" ADD CONSTRAINT "UQ_6cc9722db178c9a66aa2d19036e" UNIQUE ("pattern")',
    );
    await queryRunner.query('ALTER TABLE "etymology" DROP COLUMN "type"');
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "type" character varying(16) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" DROP CONSTRAINT "UQ_bfd65c31e38d5fc46deb55a0351"',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" DROP COLUMN "graecoLatinEtymology"',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "graecoLatinEtymology" character varying(64) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD CONSTRAINT "UQ_bfd65c31e38d5fc46deb55a0351" UNIQUE ("graecoLatinEtymology")',
    );
    await queryRunner.query('ALTER TABLE "etymology" DROP COLUMN "language"');
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "language" character varying(64) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "word" DROP CONSTRAINT "UQ_8355d962fea7fe9fef57d58ffff"',
    );
    await queryRunner.query('ALTER TABLE "word" DROP COLUMN "word"');
    await queryRunner.query(
      'ALTER TABLE "word" ADD "word" character varying(64) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "word" ADD CONSTRAINT "UQ_8355d962fea7fe9fef57d58ffff" UNIQUE ("word")',
    );
    await queryRunner.query(
      'ALTER TABLE "category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"',
    );
    await queryRunner.query('ALTER TABLE "category" DROP COLUMN "name"');
    await queryRunner.query(
      'ALTER TABLE "category" ADD "name" character varying(64) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")',
    );
    await queryRunner.query('ALTER TABLE "version" DROP COLUMN "version"');
    await queryRunner.query(
      'ALTER TABLE "version" ADD "version" character varying(16) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "version" DROP COLUMN "version"');
    await queryRunner.query(
      'ALTER TABLE "version" ADD "version" character varying(4) NOT NULL',
    );
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
    await queryRunner.query(
      'ALTER TABLE "word" DROP CONSTRAINT "UQ_8355d962fea7fe9fef57d58ffff"',
    );
    await queryRunner.query('ALTER TABLE "word" DROP COLUMN "word"');
    await queryRunner.query(
      'ALTER TABLE "word" ADD "word" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "word" ADD CONSTRAINT "UQ_8355d962fea7fe9fef57d58ffff" UNIQUE ("word")',
    );
    await queryRunner.query('ALTER TABLE "etymology" DROP COLUMN "language"');
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "language" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" DROP CONSTRAINT "UQ_bfd65c31e38d5fc46deb55a0351"',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" DROP COLUMN "graecoLatinEtymology"',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "graecoLatinEtymology" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD CONSTRAINT "UQ_bfd65c31e38d5fc46deb55a0351" UNIQUE ("graecoLatinEtymology")',
    );
    await queryRunner.query('ALTER TABLE "etymology" DROP COLUMN "type"');
    await queryRunner.query(
      'ALTER TABLE "etymology" ADD "type" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pattern" DROP CONSTRAINT "UQ_6cc9722db178c9a66aa2d19036e"',
    );
    await queryRunner.query('ALTER TABLE "pattern" DROP COLUMN "pattern"');
    await queryRunner.query(
      'ALTER TABLE "pattern" ADD "pattern" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pattern" ADD CONSTRAINT "UQ_6cc9722db178c9a66aa2d19036e" UNIQUE ("pattern")',
    );
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "name"');
    await queryRunner.query(
      'ALTER TABLE "user" ADD "name" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"',
    );
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "email"');
    await queryRunner.query(
      'ALTER TABLE "user" ADD "email" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")',
    );
    await queryRunner.query(
      'ALTER TABLE "option" DROP CONSTRAINT "UQ_9c43523275e2dfe59aa060f553e"',
    );
    await queryRunner.query('ALTER TABLE "option" DROP COLUMN "option"');
    await queryRunner.query(
      'ALTER TABLE "option" ADD "option" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "option" ADD CONSTRAINT "UQ_9c43523275e2dfe59aa060f553e" UNIQUE ("option")',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" DROP COLUMN "publishingCompany"',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" ADD "publishingCompany" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" DROP COLUMN "publicationPlace"',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" ADD "publicationPlace" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" DROP CONSTRAINT "UQ_9c99fbcdd84247d625bb8e4141d"',
    );
    await queryRunner.query('ALTER TABLE "reference" DROP COLUMN "title"');
    await queryRunner.query(
      'ALTER TABLE "reference" ADD "title" character varying(32) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "reference" ADD CONSTRAINT "UQ_9c99fbcdd84247d625bb8e4141d" UNIQUE ("title")',
    );
    await queryRunner.query('ALTER TABLE "reference" DROP COLUMN "author"');
    await queryRunner.query(
      'ALTER TABLE "reference" ADD "author" character varying(32) NOT NULL',
    );
  }
}
