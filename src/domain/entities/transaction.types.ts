import { type Asset } from "../value_objects/asset";

export enum OperationTypes {
	BUY = "Compra",
	SELL = "Venda",
}

export const signalMap = {
	[OperationTypes.BUY]: 1,
	[OperationTypes.SELL]: -1,
};

export interface TransactionInput {
	date: Date;
	owner: string;
	broker: string;
	asset: Asset;
	operationType: OperationTypes;
	quantity: number;
	unitPrice: number;
}
