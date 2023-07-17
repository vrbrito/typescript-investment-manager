import { InvalidPosition } from "../exceptions/position";
import { type Asset } from "../value_objects/asset";
import { type Transaction } from "./transaction";
import { OperationTypes, signalMap } from "./transaction.types";

export class Position {
	public constructor(
		public readonly asset: Asset,
		public readonly transactions: Transaction[],
	) {
		this.validate();
	}

	private _buyTransactions(): Transaction[] {
		return this.transactions.filter((transaction) => transaction.operationType === OperationTypes.BUY);
	}

	public get quantity(): number {
		return this.transactions.reduce(
			(sum, transaction) => sum + signalMap[transaction.operationType] * transaction.quantity,
			0,
		);
	}

	public get unitPrice(): number {
		if (this.quantity === 0) {
			return 0;
		}

		const buyTransactions = this._buyTransactions();

		const buyQuantity = buyTransactions.reduce((sum, transaction) => sum + transaction.quantity, 0);
		const buyUnitPrice = buyTransactions.reduce((sum, transaction) => sum + transaction.total / buyQuantity, 0);

		return buyUnitPrice;
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

		if (this.unitPrice < 0) {
			throw new InvalidPosition("unitPrice is negative");
		}
	}
}
