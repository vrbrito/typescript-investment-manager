import { describe, expect, it } from "vitest";
import { InMemoryTransactionRepository } from "../adapters/repository/transaction.repository";
import { Position } from "../domain/entities/position";
import { transactionFactory } from "../shared/testing/factories/transaction";
import { listPositions, listPositionsByOwner } from "./position.services";

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

	it("list positions by owner, empty repository", async () => {
		const selectedOwner = "Vitor";

		const ownerTransaction = transactionFactory.build({ owner: selectedOwner });
		const otherTransaction = transactionFactory.build({ owner: "Other" });

		const repo = new InMemoryTransactionRepository([ownerTransaction, otherTransaction]);
		const filteredPositions = await listPositionsByOwner(repo, selectedOwner);

		const expectedPositions = Position.consolidatePositions([ownerTransaction]);

		expect(filteredPositions.length).toBe(1);
		expect(filteredPositions).toEqual(expectedPositions);
	});
});
