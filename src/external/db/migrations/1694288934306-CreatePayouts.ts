import { type MigrationInterface, type QueryRunner } from "typeorm";

export class CreatePayouts1694288934306 implements MigrationInterface {
	name = "CreatePayouts1694288934306";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "payouts" ("id" SERIAL NOT NULL, "uid" uuid NOT NULL, "date" date NOT NULL, "owner" character varying NOT NULL, "broker" character varying NOT NULL, "amount" double precision NOT NULL, CONSTRAINT "PK_76855dc4f0a6c18c72eea302e87" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "payouts"`);
	}
}
