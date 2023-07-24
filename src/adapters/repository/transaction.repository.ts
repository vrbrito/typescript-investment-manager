import { type Transaction } from "../../domain/entities/transaction";

export interface TransactionRepository {
	add: (transaction: Transaction) => Promise<void>;
	findAll: () => Promise<Transaction[]>;
}

export class InMemoryTransactionRepository implements TransactionRepository {
	public constructor(public transactions: Transaction[] = []) {}

	public async add(transaction: Transaction): Promise<void> {
		this.transactions.push(transaction);
	}

	public async findAll(): Promise<Transaction[]> {
		return this.transactions;
	}

	public clear(): void {
		this.transactions = [];
	}
}
