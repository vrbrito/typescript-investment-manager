import { type MigrationInterface, type QueryRunner } from "typeorm";

export class CreateAssets1694288896022 implements MigrationInterface {
	name = "CreateAssets1694288896022";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "assets" ("id" SERIAL NOT NULL, "uid" uuid NOT NULL, "ticker" character varying NOT NULL, "assetClass" "public"."assets_assetclass_enum" NOT NULL, CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "assets"`);
	}
}
