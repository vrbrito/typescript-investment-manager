import { Factory } from "fishery";
import { Transaction } from "../../../domain/entities/transaction";
import { OperationTypes } from "../../../domain/entities/transaction.types";
import { assetFactory } from "./asset";

export const transactionFactory = Factory.define<Transaction>(() => {
	const values = {
		date: new Date(),
		owner: "Vitor",
		broker: "Inter",
		asset: assetFactory.build(),
		operationType: OperationTypes.BUY,
		quantity: 10,
		unitPrice: 100,
	};

	return new Transaction(
		values.date,
		values.owner,
		values.broker,
		values.asset,
		values.operationType,
		values.quantity,
		values.unitPrice,
	);
});
