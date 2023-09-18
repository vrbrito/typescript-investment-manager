import { type MigrationInterface, type QueryRunner } from "typeorm";

export class CreateTransactions1694288686846 implements MigrationInterface {
	name = "CreateTransactions1694288686846";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "uid" uuid NOT NULL, "date" date NOT NULL, "owner" character varying NOT NULL, "broker" character varying NOT NULL, "operationType" "public"."transactions_operationtype_enum" NOT NULL, "quantity" integer NOT NULL, "unitPrice" double precision NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "transactions"`);
	}
}
