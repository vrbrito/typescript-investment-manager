import { type Asset } from "../value_objects/asset";

export interface PayoutInput {
	date: Date;
	owner: string;
	broker: string;
	asset: Asset;
	amount: number;
}
