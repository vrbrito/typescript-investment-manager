import { InvalidPosition } from "../exceptions/position";
import { type Asset } from "../value_objects/asset";
import { type ConsolidatedPosition } from "./position.types";
import { type Transaction } from "./transaction";
import { OperationTypes } from "./transaction.types";

const sortByDate = (a: Transaction, b: Transaction): number => a.date.getTime() - b.date.getTime();
const isBuyOperation = (transaction: Transaction): boolean => transaction.operationType === OperationTypes.BUY;

export class Position {
	public constructor(
		public readonly asset: Asset,
		public readonly transactions: Transaction[],
	) {
		this.validate();
	}

	private get openTransactions(): Transaction[] {
		let openTransactions: Transaction[] = [];
		let quantity = 0;

		const sortedTransactions = this.transactions.sort(sortByDate);

		for (const transaction of sortedTransactions) {
			openTransactions.push(transaction);
			quantity += transaction.signedQuantity;

			if (quantity === 0) {
				openTransactions = [];
			}
		}

		return openTransactions;
	}

	public get quantity(): number {
		return this.openTransactions.reduce((sum, transaction) => sum + transaction.signedQuantity, 0);
	}

	public get unitPrice(): number {
		if (this.quantity === 0) {
			return 0;
		}

		const buyTransactions = this.openTransactions.filter(isBuyOperation);

		const buyQuantity = buyTransactions.reduce((sum, transaction) => sum + transaction.quantity, 0);
		return buyTransactions.reduce((sum, transaction) => sum + transaction.total / buyQuantity, 0);
	}

	public get total(): number {
		return this.quantity * this.unitPrice;
	}

	public validate(): void {
		const assets = this.transactions.map((transaction) => transaction.asset.ticker);
		assets.push(this.asset.ticker);

		if (new Set(assets).size > 1) {
			throw new InvalidPosition("transactions from different assets");
		}

		if (this.quantity < 0) {
			throw new InvalidPosition("quantity is negative");
		}
	}

	static consolidatePositions(transactions: Transaction[]): ConsolidatedPosition[] {
		const positions = Position.createPositions(transactions);

		const consolidatedPositions = positions.map((position) => ({
			total: position.total,
			unitPrice: position.unitPrice,
			quantity: position.quantity,
			asset: position.asset,
			transactions: position.transactions,
		}));

		return consolidatedPositions.filter((consolidatedPositions) => consolidatedPositions.total > 0);
	}

	private static createPositions(transactions: Transaction[]): Position[] {
		const positions: Record<string, Position> = {};

		for (const transaction of transactions) {
			const { asset } = transaction;
			if (!(asset.ticker in positions)) {
				positions[asset.ticker] = new Position(asset, []);
			}

			positions[asset.ticker].transactions.push(transaction);
			positions[asset.ticker].validate();
		}

		return Object.values(positions);
	}
}
