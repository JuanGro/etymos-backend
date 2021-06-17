import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToLanguage1616599514988
  implements MigrationInterface
{
  name = "AddDescriptionToLanguage1616599514988";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "language" ADD "description" character varying(128) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "language" DROP COLUMN "description"`);
  }
}
