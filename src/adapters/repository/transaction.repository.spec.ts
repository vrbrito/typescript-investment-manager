import { describe, expect, it } from "vitest";
import { transactionFactory } from "../../shared/testing/factories/transaction";
import { InMemoryTransactionRepository } from "./transaction.repository";

const transaction = transactionFactory.build();

describe("transaction in memory repository", () => {
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
	it("findByOwner transactions", async () => {
		const selectedOwner = "Vitor";

		const ownerTransaction = transactionFactory.build({ owner: selectedOwner });
		const otherTransaction = transactionFactory.build({ owner: "Other" });

		const repo = new InMemoryTransactionRepository([]);

		let transactions = await repo.findByOwner(selectedOwner);
		expect(transactions).toEqual([]);

		repo.transactions.push(ownerTransaction, otherTransaction);

		transactions = await repo.findByOwner(selectedOwner);
		expect(transactions).toEqual([ownerTransaction]);
	});

	it("clear all transactions", async () => {
		const repo = new InMemoryTransactionRepository();

		repo.transactions.push(...transactionFactory.buildList(2));

		expect(repo.transactions).toHaveLength(2);

		repo.clear();

		expect(repo.transactions).toHaveLength(0);
	});
});
