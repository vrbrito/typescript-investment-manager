import { type Asset } from "../value_objects/asset";
import { type OperationTypes, signalMap } from "./transaction.types";

export class Transaction {
	public readonly isOpenPosition?: boolean;

	public constructor(
		public readonly date: Date,
		public readonly owner: string,
		public readonly broker: string,
		public readonly asset: Asset,
		public readonly operationType: OperationTypes,
		public readonly quantity: number,
		public readonly unitPrice: number,
	) {}

	public get total(): number {
		return signalMap[this.operationType] * Number(this.quantity) * this.unitPrice;
	}

	public get year(): number {
		return this.date.getUTCFullYear();
	}

	public get month(): number {
		return this.date.getUTCMonth() + 1;
	}
}
