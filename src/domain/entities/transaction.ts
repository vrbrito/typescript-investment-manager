import { InvalidTransaction } from "../exceptions/transaction";
import { type Asset } from "../value_objects/asset";
import { signalMap, type OperationTypes } from "./transaction.types";

export class Transaction {
	public constructor(
		public readonly date: Date,
		public readonly owner: string,
		public readonly broker: string,
		public readonly asset: Asset,
		public readonly operationType: OperationTypes,
		public readonly quantity: number,
		public readonly unitPrice: number,
	) {
		this.validate();
	}

	public get signedQuantity(): number {
		return signalMap[this.operationType] * this.quantity;
	}

	public get total(): number {
		return this.signedQuantity * this.unitPrice;
	}

	public get year(): number {
		return this.date.getUTCFullYear();
	}

	public get month(): number {
		return this.date.getUTCMonth() + 1;
	}

	public validate(): void {
		if (this.quantity <= 0) {
			throw new InvalidTransaction("quantity is zero or negative");
		}

		if (this.unitPrice <= 0) {
			throw new InvalidTransaction("unitPrice is zero or negative");
		}
	}
}
