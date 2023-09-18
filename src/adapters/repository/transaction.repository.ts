import { type Repository } from "typeorm";
import { type Transaction } from "../../domain/entities/transaction";
import { type Asset } from "../../domain/value_objects/asset";
import { AppDataSource } from "../../external/db/data-source";
import { TransactionModel } from "../../external/db/models/transaction";

export interface TransactionFilter {
	owner?: string;
	broker?: string;
	asset?: Asset;
}

export interface TransactionRepository {
	add: (transaction: Transaction) => Promise<void>;
	findAll: () => Promise<Transaction[]>;
	findBy: (filter: TransactionFilter) => Promise<Transaction[]>;
}

export class InMemoryTransactionRepository implements TransactionRepository {
	public constructor(public transactions: Transaction[] = []) {}

	public async add(transaction: Transaction): Promise<void> {
		this.transactions.push(transaction);
	}

	public async findAll(): Promise<Transaction[]> {
		return this.transactions;
	}

	public async findBy(filter: TransactionFilter): Promise<Transaction[]> {
		const isOwner = (transaction: Transaction): boolean =>
			filter.owner === undefined || filter.owner.toLowerCase() === transaction.owner.toLowerCase();
		const isBroker = (transaction: Transaction): boolean =>
			filter.broker === undefined || filter.broker.toLowerCase() === transaction.broker.toLowerCase();
		const isAsset = (transaction: Transaction): boolean =>
			filter.asset === undefined ||
			(filter.asset.ticker === transaction.asset.ticker &&
				filter.asset.assetClass === transaction.asset.assetClass);

		return this.transactions.filter(
			(transaction) => isOwner(transaction) && isBroker(transaction) && isAsset(transaction),
		);
	}

	public clear(): void {
		this.transactions = [];
	}
}

export class DBTransactionRepository implements TransactionRepository {
	private get manager(): Repository<TransactionModel> {
		return AppDataSource.getRepository(TransactionModel);
	}

	private convertToEntities(transactionModels: TransactionModel[]): Transaction[] {
		return transactionModels.map((transactionModel) => transactionModel.toEntity());
	}

	public async add(transaction: Transaction): Promise<void> {
		const transactionModel = this.manager.create({ owner: transaction.owner });
		await this.manager.save(transactionModel);
	}

	public async findAll(): Promise<Transaction[]> {
		const transactionModels = await this.manager.find({});
		return this.convertToEntities(transactionModels);
	}

	public async findBy(filter: TransactionFilter): Promise<Transaction[]> {
		const transactionModels = await this.manager.findBy(filter);
		return this.convertToEntities(transactionModels);
	}
}
