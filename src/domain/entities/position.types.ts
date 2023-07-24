import { type Asset } from "../value_objects/asset";
import { type Transaction } from "./transaction";

export interface ConsolidatedPosition {
	asset: Asset;
	transactions: Transaction[];
	quantity: number;
	unitPrice: number;
	total: number;
}
