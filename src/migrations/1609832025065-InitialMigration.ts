import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1609832025065
implements MigrationInterface {
  name = 'InitialMigration1609832025065';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "reference" ("id" SERIAL NOT NULL, "author" character varying(32) NOT NULL, "title" character varying(32) NOT NULL, "publicationYear" character varying(4) NOT NULL, "publicationPlace" character varying(32) NOT NULL, "publishingCompany" character varying(32) NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_01bacbbdd90839b7dce352e4250" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "question" ("id" SERIAL NOT NULL, "sentence" character varying(32) NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "referenceId" integer, CONSTRAINT "UQ_c179132315228cb3cff65ffcfd0" UNIQUE ("sentence"), CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "pattern" ("id" SERIAL NOT NULL, "pattern" character varying(32) NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_50f41f421043f2637873957f277" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "etymology" ("id" SERIAL NOT NULL, "type" character varying(32) NOT NULL, "graecoLatinEtymology" character varying(32) NOT NULL, "meaning" character varying(256) NOT NULL, "language" character varying(32) NOT NULL, "imageUrl" character varying(256) NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bfd65c31e38d5fc46deb55a0351" UNIQUE ("graecoLatinEtymology"), CONSTRAINT "PK_2e414abf89b79dbaa9810f6829d" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "word" ("id" SERIAL NOT NULL, "word" character varying(32) NOT NULL, "meaning" character varying(256) NOT NULL, "imageUrl" character varying(256) NOT NULL, "category" character varying(32) NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8355d962fea7fe9fef57d58ffff" UNIQUE ("word"), CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(32) NOT NULL, "name" character varying(32) NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "test" ("id" SERIAL NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "answer" ("id" SERIAL NOT NULL, "answer" character varying(32) NOT NULL, "correct" boolean NOT NULL DEFAULT false, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "questionId" integer, "testId" integer, CONSTRAINT "UQ_9929dfb5c5c35f826dd073b0739" UNIQUE ("answer"), CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "maintenance" ("id" SERIAL NOT NULL, "maintenance" boolean NOT NULL DEFAULT false, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_542fb6a28537140d2df95faa52a" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "wrong_option_rule" ("id" SERIAL NOT NULL, "target" character varying(8) NOT NULL, "replacement" character varying(8) NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_44298628bffb9b991f432d0a68a" UNIQUE ("target"), CONSTRAINT "PK_9c574309b59428681c90ccc3574" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "etymology_patterns_pattern" ("etymologyId" integer NOT NULL, "patternId" integer NOT NULL, CONSTRAINT "PK_f5788b38a8ddc48e013c0f77e32" PRIMARY KEY ("etymologyId", "patternId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_dccd00f34e8e5adfce9e793847" ON "etymology_patterns_pattern" ("etymologyId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_7c0cc91088b14f58aa19b5af6e" ON "etymology_patterns_pattern" ("patternId") ',
    );
    await queryRunner.query(
      'CREATE TABLE "word_etymologies_etymology" ("wordId" integer NOT NULL, "etymologyId" integer NOT NULL, CONSTRAINT "PK_7fbcc13373f5570a051915ed647" PRIMARY KEY ("wordId", "etymologyId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_8ef01671e701ad05ff0a339ee7" ON "word_etymologies_etymology" ("wordId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_293ab4f2fd987f5ac44a346252" ON "word_etymologies_etymology" ("etymologyId") ',
    );
    await queryRunner.query(
      'CREATE TABLE "user_words_word" ("userId" integer NOT NULL, "wordId" integer NOT NULL, CONSTRAINT "PK_54ec4f3515004b2113cc051a6c1" PRIMARY KEY ("userId", "wordId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_66d70c58b59b1aba106e17a613" ON "user_words_word" ("userId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_02b98eafcba69247559b60ddc7" ON "user_words_word" ("wordId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "question" ADD CONSTRAINT "FK_baed452feb7bc9d42afea613971" FOREIGN KEY ("referenceId") REFERENCES "reference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "test" ADD CONSTRAINT "FK_394889f330e608a61edd1163cdf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "answer" ADD CONSTRAINT "FK_22276ae06f463c989d972795d82" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology_patterns_pattern" ADD CONSTRAINT "FK_dccd00f34e8e5adfce9e7938475" FOREIGN KEY ("etymologyId") REFERENCES "etymology"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology_patterns_pattern" ADD CONSTRAINT "FK_7c0cc91088b14f58aa19b5af6e1" FOREIGN KEY ("patternId") REFERENCES "pattern"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "word_etymologies_etymology" ADD CONSTRAINT "FK_8ef01671e701ad05ff0a339ee7b" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "word_etymologies_etymology" ADD CONSTRAINT "FK_293ab4f2fd987f5ac44a346252e" FOREIGN KEY ("etymologyId") REFERENCES "etymology"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_words_word" ADD CONSTRAINT "FK_66d70c58b59b1aba106e17a6135" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_words_word" ADD CONSTRAINT "FK_02b98eafcba69247559b60ddc7c" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_words_word" DROP CONSTRAINT "FK_02b98eafcba69247559b60ddc7c"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_words_word" DROP CONSTRAINT "FK_66d70c58b59b1aba106e17a6135"',
    );
    await queryRunner.query(
      'ALTER TABLE "word_etymologies_etymology" DROP CONSTRAINT "FK_293ab4f2fd987f5ac44a346252e"',
    );
    await queryRunner.query(
      'ALTER TABLE "word_etymologies_etymology" DROP CONSTRAINT "FK_8ef01671e701ad05ff0a339ee7b"',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology_patterns_pattern" DROP CONSTRAINT "FK_7c0cc91088b14f58aa19b5af6e1"',
    );
    await queryRunner.query(
      'ALTER TABLE "etymology_patterns_pattern" DROP CONSTRAINT "FK_dccd00f34e8e5adfce9e7938475"',
    );
    await queryRunner.query(
      'ALTER TABLE "answer" DROP CONSTRAINT "FK_22276ae06f463c989d972795d82"',
    );
    await queryRunner.query(
      'ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"',
    );
    await queryRunner.query(
      'ALTER TABLE "test" DROP CONSTRAINT "FK_394889f330e608a61edd1163cdf"',
    );
    await queryRunner.query(
      'ALTER TABLE "question" DROP CONSTRAINT "FK_baed452feb7bc9d42afea613971"',
    );
    await queryRunner.query('DROP INDEX "IDX_02b98eafcba69247559b60ddc7"');
    await queryRunner.query('DROP INDEX "IDX_66d70c58b59b1aba106e17a613"');
    await queryRunner.query('DROP TABLE "user_words_word"');
    await queryRunner.query('DROP INDEX "IDX_293ab4f2fd987f5ac44a346252"');
    await queryRunner.query('DROP INDEX "IDX_8ef01671e701ad05ff0a339ee7"');
    await queryRunner.query('DROP TABLE "word_etymologies_etymology"');
    await queryRunner.query('DROP INDEX "IDX_7c0cc91088b14f58aa19b5af6e"');
    await queryRunner.query('DROP INDEX "IDX_dccd00f34e8e5adfce9e793847"');
    await queryRunner.query('DROP TABLE "etymology_patterns_pattern"');
    await queryRunner.query('DROP TABLE "wrong_option_rule"');
    await queryRunner.query('DROP TABLE "maintenance"');
    await queryRunner.query('DROP TABLE "answer"');
    await queryRunner.query('DROP TABLE "test"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "word"');
    await queryRunner.query('DROP TABLE "etymology"');
    await queryRunner.query('DROP TABLE "pattern"');
    await queryRunner.query('DROP TABLE "question"');
    await queryRunner.query('DROP TABLE "reference"');
  }
}
