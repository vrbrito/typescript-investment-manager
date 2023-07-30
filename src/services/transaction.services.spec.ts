import { describe, expect, it } from "vitest";
import { InMemoryTransactionRepository } from "../adapters/repository/transaction.repository";
import { OperationTypes, type TransactionInput } from "../domain/entities/transaction.types";
import { assetFactory } from "../shared/testing/factories/asset";
import { transactionFactory } from "../shared/testing/factories/transaction";
import { listTransactions, registerTransaction } from "./transaction.services";

describe("transaction services", async () => {
	it("register transaction", async () => {
		const repo = new InMemoryTransactionRepository([]);
		const input: TransactionInput = {
			date: new Date(),
			owner: "Test",
			broker: "Bank",
			asset: assetFactory.build(),
			operationType: OperationTypes.BUY,
			quantity: 100,
			unitPrice: 10,
		};

		await registerTransaction(repo, input);

		const expectedTransaction = transactionFactory.build(input);
		expect(repo.transactions).toContainEqual(expectedTransaction);
	});

	it("register transaction, fails due to invalid position", async () => {
		const repo = new InMemoryTransactionRepository([]);
		const input: TransactionInput = {
			date: new Date(),
			owner: "Test",
			broker: "Bank",
			asset: assetFactory.build(),
			operationType: OperationTypes.SELL,
			quantity: 100,
			unitPrice: 10,
		};

		await expect(async () => {
			await registerTransaction(repo, input);
		}).rejects.toThrow("Invalid transaction: invalid quantity for current position");
	});

	it("list transactions", async () => {
		const sampleTransactions = transactionFactory.buildList(2);

		const repo = new InMemoryTransactionRepository(sampleTransactions);
		const transactions = await listTransactions(repo);

		expect(transactions).toEqual(sampleTransactions);
	});

	it("list transactions, empty repository", async () => {
		const repo = new InMemoryTransactionRepository();
		const transactions = await listTransactions(repo);

		expect(transactions).toEqual([]);
	});
});
