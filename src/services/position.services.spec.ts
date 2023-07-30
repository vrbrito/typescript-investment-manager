import { describe, expect, it } from "vitest";
import { InMemoryTransactionRepository } from "../adapters/repository/transaction.repository";
import { Position } from "../domain/entities/position";
import { OperationTypes } from "../domain/entities/transaction.types";
import { assetFactory } from "../shared/testing/factories/asset";
import { transactionFactory } from "../shared/testing/factories/transaction";
import { checkIfValidPosition, getPosition, listPositions, listPositionsByOwner } from "./position.services";

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

	it("list positions by owner", async () => {
		const selectedOwner = "Vitor";

		const ownerTransaction = transactionFactory.build({ owner: selectedOwner });
		const otherTransaction = transactionFactory.build({ owner: "Other" });

		const repo = new InMemoryTransactionRepository([ownerTransaction, otherTransaction]);
		const filteredPositions = await listPositionsByOwner(repo, selectedOwner);

		const expectedPositions = Position.consolidatePositions([ownerTransaction]);

		expect(filteredPositions.length).toBe(1);
		expect(filteredPositions).toEqual(expectedPositions);
	});

	it("get position", async () => {
		const selectedOwner = "Vitor";
		const asset = assetFactory.build({ ticker: "WEGE3" });

		const sameOwnerAndAssetTransaction = transactionFactory.build({ owner: selectedOwner, asset });
		const sameOwnerAndDiffAssetTransaction = transactionFactory.build({ owner: selectedOwner });
		const otherOwnerSameAssetTransaction = transactionFactory.build({ owner: "Other", asset });
		const diffOwnerAndDiffAssetTransaction = transactionFactory.build({ owner: "Other" });

		const repo = new InMemoryTransactionRepository([
			sameOwnerAndAssetTransaction,
			sameOwnerAndDiffAssetTransaction,
			otherOwnerSameAssetTransaction,
			diffOwnerAndDiffAssetTransaction,
		]);

		const position = await getPosition(repo, selectedOwner, asset);

		expect(position.asset).toEqual(asset);
		expect(position.quantity).toEqual(10);
		expect(position.total).toEqual(1000);
		expect(position.unitPrice).toEqual(100);
		expect(position.transactions).toEqual([sameOwnerAndAssetTransaction]);
	});

	it("get position, no transactions found", async () => {
		const selectedOwner = "Vitor";
		const asset = assetFactory.build({ ticker: "WEGE3" });

		const repo = new InMemoryTransactionRepository([]);

		const position = await getPosition(repo, selectedOwner, asset);

		expect(position.asset).toEqual(asset);
		expect(position.quantity).toEqual(0);
		expect(position.total).toEqual(0);
		expect(position.unitPrice).toEqual(0);
		expect(position.transactions).toEqual([]);
	});

	it.each([
		["positive quantity", 100, true],
		["negative quantity", -100, false],
	])("check if valid position (%s, %d, should be %o)", async (_, quantity, expectedResult) => {
		const baseTransaction = transactionFactory.build({ quantity: 50, unitPrice: 10 });
		const newTransaction = transactionFactory.build({
			quantity: Math.abs(quantity),
			unitPrice: 10,
			operationType: quantity > 0 ? OperationTypes.BUY : OperationTypes.SELL,
		});

		const repo = new InMemoryTransactionRepository([baseTransaction]);

		const isValidPosition = await checkIfValidPosition(repo, newTransaction);

		expect(isValidPosition).toBe(expectedResult);
	});
});
