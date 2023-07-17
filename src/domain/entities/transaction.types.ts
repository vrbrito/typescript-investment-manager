export enum OperationTypes {
	BUY = "Compra",
	SELL = "Venda",
}

export const signalMap = {
	[OperationTypes.BUY]: 1,
	[OperationTypes.SELL]: -1,
};
