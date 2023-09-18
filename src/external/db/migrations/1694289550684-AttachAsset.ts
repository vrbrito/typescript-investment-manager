import { type MigrationInterface, type QueryRunner } from "typeorm";

export class AttachAsset1694289550684 implements MigrationInterface {
	name = "AttachAsset1694289550684";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "payouts" ADD "assetId" integer`);
		await queryRunner.query(`ALTER TABLE "transactions" ADD "assetId" integer`);
		await queryRunner.query(
			`ALTER TABLE "assets" ADD CONSTRAINT "UQ_857bd921e642fdd25c0f711b2c8" UNIQUE ("ticker")`,
		);
		await queryRunner.query(
			`ALTER TABLE "payouts" ADD CONSTRAINT "FK_194f1c5cf7a18d38a974c1179b2" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "transactions" ADD CONSTRAINT "FK_7a6e7bd44674390f67b643408b6" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_7a6e7bd44674390f67b643408b6"`);
		await queryRunner.query(`ALTER TABLE "payouts" DROP CONSTRAINT "FK_194f1c5cf7a18d38a974c1179b2"`);
		await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "UQ_857bd921e642fdd25c0f711b2c8"`);
		await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "assetId"`);
		await queryRunner.query(`ALTER TABLE "payouts" DROP COLUMN "assetId"`);
	}
}
