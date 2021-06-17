import {MigrationInterface, QueryRunner} from "typeorm";

export class AddActiveFieldsToAllEntities1616611419842 implements MigrationInterface {
    name = 'AddActiveFieldsToAllEntities1616611419842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reference" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "option" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "question" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "test" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "pattern" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "language" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "etymology_type" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "etymology" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "word" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "etymology" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "etymology_type" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "language" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "pattern" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "option" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "reference" DROP COLUMN "active"`);
    }

}
