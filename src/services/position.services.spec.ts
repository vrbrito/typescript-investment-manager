import { describe, expect, it } from "vitest";
import { InMemoryTransactionRepository } from "../adapters/repository/transaction.repository";
import { Position } from "../domain/entities/position";
import { transactionFactory } from "../shared/testing/factories/transaction";
import { listPositions } from "./position.services";

describe("position services", async () => {
	it("list positions", async () => {
		const sampleTransactions = transactionFactory.buildList(5);

		const repo = new InMemoryTransactionRepository(sampleTransactions);
		const positions = await listPositions(repo);

		const expectedPositions = Position.consolidatePositions(sampleTransactions);

		expect(positions).toEqual(expectedPositions);
	});

	it("list positions, empty repository", async () => {
		const repo = new InMemoryTransactionRepository();
		const positions = await listPositions(repo);

		expect(positions).toEqual([]);
	});
});
