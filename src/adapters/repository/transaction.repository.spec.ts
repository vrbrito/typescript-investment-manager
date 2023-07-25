import { describe, expect, it } from "vitest";
import { assetFactory } from "../../shared/testing/factories/asset";
import { transactionFactory } from "../../shared/testing/factories/transaction";
import { InMemoryTransactionRepository } from "./transaction.repository";

const asset = assetFactory.build({ ticker: "WEGE3" });
const allTransactions = [
	transactionFactory.build({ asset }),
	transactionFactory.build({ owner: "Cinara", broker: "Rico" }),
	transactionFactory.build({ broker: "Rico" }),
];

describe("transaction in memory repository", () => {
	it("add transaction", async () => {
		const repo = new InMemoryTransactionRepository();

		await repo.add(allTransactions[0]);

		const transactions = repo.transactions;

		expect(transactions).toContain(allTransactions[0]);
		expect(transactions.length).toBe(1);
	});

	it("findAll transactions", async () => {
		const repo = new InMemoryTransactionRepository([]);

		let transactions = await repo.findAll();
		expect(transactions).toEqual([]);

		repo.transactions.push(...allTransactions);

		transactions = await repo.findAll();
		expect(transactions).toEqual(allTransactions);
	});

	it.each([
		["empty", {}, allTransactions],
		["only asset", { asset }, allTransactions.slice(0, 1)],
		["only owner", { owner: "Cinara" }, allTransactions.slice(1, 2)],
		["only broker", { broker: "Rico" }, allTransactions.slice(1, 3)],
		["some values", { owner: "Cinara", broker: "Rico" }, allTransactions.slice(1, 2)],
		["all values", { asset, owner: "Cinara", broker: "Rico" }, []],
	])("findBy transactions (%s)", async (_, filterBy, expectedTransactions) => {
		const repo = new InMemoryTransactionRepository([]);

		let transactions = await repo.findBy(filterBy);
		expect(transactions).toEqual([]);

		repo.transactions.push(...allTransactions);

		transactions = await repo.findBy(filterBy);
		expect(transactions).toEqual(expectedTransactions);
	});

	it("clear all transactions", async () => {
		const repo = new InMemoryTransactionRepository();

		repo.transactions.push(...transactionFactory.buildList(2));

		expect(repo.transactions).toHaveLength(2);

		repo.clear();

		expect(repo.transactions).toHaveLength(0);
	});
});
