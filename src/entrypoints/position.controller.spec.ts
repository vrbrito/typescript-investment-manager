import supertest from "supertest";
import { describe, expect, it } from "vitest";
import { Position } from "../domain/entities/position";
import { transactionFactory } from "../shared/testing/factories/transaction";
import { convertDateToStr } from "../shared/testing/utils";

describe("position endpoints", () => {
	it("should list positions", async () => {
		const sampleTransaction = transactionFactory.build();
		global.dependencies.transactionRepository.transactions.push(sampleTransaction);

		const client = supertest(global.app);
		const { body, status } = await client.get("/positions");

		const expectedPositions = Position.consolidatePositions([sampleTransaction]);

		expect(status).toEqual(200);
		expect(body).toEqual(
			expectedPositions.map((position) => ({
				...position,
				transactions: position.transactions.map(convertDateToStr),
			})),
		);
	});

	it("should list positions by owner", async () => {
		const selectedOwner = "Test";

		const ownerTransaction = transactionFactory.build({ owner: selectedOwner });
		const otherTransaction = transactionFactory.build({ owner: "Other" });
		global.dependencies.transactionRepository.transactions.push(ownerTransaction, otherTransaction);

		const client = supertest(global.app);
		const { body, status } = await client.get(`/positions/${selectedOwner.toLowerCase()}`);

		const expectedPositions = Position.consolidatePositions([ownerTransaction]);

		expect(status).toEqual(200);
		expect(body).toEqual(
			expectedPositions.map((position) => ({
				...position,
				transactions: position.transactions.map(convertDateToStr),
			})),
		);
	});
});
