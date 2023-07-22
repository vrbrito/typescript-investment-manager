import { InvalidPayout } from "../exceptions/payout";
import { type Asset } from "../value_objects/asset";

export class Payout {
	public constructor(
		public readonly date: Date,
		public readonly owner: string,
		public readonly broker: string,
		public readonly asset: Asset,
		public readonly amount: number,
	) {
		this.validate();
	}

	public validate(): void {
		if (this.amount <= 0) {
			throw new InvalidPayout("amount is zero or negative");
		}
	}
}
