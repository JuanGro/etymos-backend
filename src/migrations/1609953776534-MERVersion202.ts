import { MigrationInterface, QueryRunner } from "typeorm";

export class MERVersion2021609953776534 implements MigrationInterface {
  name = "MERVersion2021609953776534";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "word" RENAME COLUMN "category" TO "categoryId"`
    );
    await queryRunner.query(
      `CREATE TABLE "option" ("id" SERIAL NOT NULL, "option" character varying(32) NOT NULL, "correct" boolean NOT NULL DEFAULT false, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9c43523275e2dfe59aa060f553e" UNIQUE ("option"), CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, "active" boolean NOT NULL DEFAULT true, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "version" ("id" SERIAL NOT NULL, "version" character varying(4) NOT NULL, "maintenance" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT true, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4fb5fbb15a43da9f35493107b1d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "active" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "categoryId"`);
    await queryRunner.query(`ALTER TABLE "word" ADD "categoryId" integer`);
    await queryRunner.query(
      `ALTER TABLE "word" ADD CONSTRAINT "FK_102b2569c8611b68aafeee7d26e" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "word" DROP CONSTRAINT "FK_102b2569c8611b68aafeee7d26e"`
    );
    await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "categoryId"`);
    await queryRunner.query(
      `ALTER TABLE "word" ADD "categoryId" character varying(32) NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
    await queryRunner.query(`DROP TABLE "version"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "option"`);
    await queryRunner.query(
      `ALTER TABLE "word" RENAME COLUMN "categoryId" TO "category"`
    );
  }
}
