import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveWrongOptionRule1616561263077 implements MigrationInterface {
    name = 'RemoveWrongOptionRule1616561263077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "option" DROP CONSTRAINT "FK_767f7f8e521c1c6991d3bf884ad"`);
        await queryRunner.query(`ALTER TABLE "option" DROP COLUMN "wrongOptionRuleId"`);
        await queryRunner.query(`DROP TABLE "wrong_option_rule"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "option" ADD "wrongOptionRuleId" integer`);
        await queryRunner.query(`ALTER TABLE "option" ADD CONSTRAINT "FK_767f7f8e521c1c6991d3bf884ad" FOREIGN KEY ("wrongOptionRuleId") REFERENCES "wrong_option_rule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "wrong_option_rule"`);
    }

}
