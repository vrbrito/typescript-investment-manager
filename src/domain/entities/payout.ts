import { type Asset } from "../value_objects/asset";

export class Payout {
	public constructor(
		public readonly date: Date,
		public readonly owner: string,
		public readonly broker: string,
		public readonly asset: Asset,
		public readonly amount: number,
	) {}
}
