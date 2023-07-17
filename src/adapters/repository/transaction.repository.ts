import { type Transaction } from "../../domain/entities/transaction";

export interface TransactionRepository {
	add: (transaction: Transaction) => Promise<void>;
	findAll: () => Promise<Transaction[]>;
}

export class InMemoryTransactionRepository implements TransactionRepository {
	public constructor(public readonly transactions: Transaction[] = []) {}

	public async add(transaction: Transaction): Promise<void> {
		this.transactions.push(transaction);
	}

	public async findAll(): Promise<Transaction[]> {
		return this.transactions;
	}
}
