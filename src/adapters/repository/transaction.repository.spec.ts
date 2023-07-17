import { describe, expect, it } from "vitest";
import { InMemoryTransactionRepository } from "./transaction.repository";
import { transactionFactory } from "../../shared/testing/factories/transaction";

const transaction = transactionFactory.build();

describe("transaction db repository", () => {
	it("add transaction", async () => {
		const repo = new InMemoryTransactionRepository();

		await repo.add(transaction);

		const transactions = repo.transactions;

		expect(transactions).toContain(transaction);
		expect(transactions.length).toBe(1);
	});

	it("findAll transactions", async () => {
		const repo = new InMemoryTransactionRepository([]);

		let transactions = await repo.findAll();
		expect(transactions).toEqual([]);

		repo.transactions.push(transaction);

		transactions = await repo.findAll();
		expect(transactions).toEqual([transaction]);
	});
});
