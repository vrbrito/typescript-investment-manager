import { type Transaction } from "../../domain/entities/transaction";

export interface TransactionRepository {
	add: (transaction: Transaction) => Promise<void>;
	findAll: () => Promise<Transaction[]>;
	findByOwner: (owner: string) => Promise<Transaction[]>;
}

export class InMemoryTransactionRepository implements TransactionRepository {
	public constructor(public transactions: Transaction[] = []) {}

	public async add(transaction: Transaction): Promise<void> {
		this.transactions.push(transaction);
	}

	public async findAll(): Promise<Transaction[]> {
		return this.transactions;
	}

	public async findByOwner(owner: string): Promise<Transaction[]> {
		return this.transactions.filter((transaction) => transaction.owner.toLowerCase() === owner.toLowerCase());
	}

	public clear(): void {
		this.transactions = [];
	}
}
