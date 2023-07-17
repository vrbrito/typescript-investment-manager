import { describe, expect, it } from "vitest";
import { transactionFactory } from "../../shared/testing/factories/transaction";
import { OperationTypes } from "./transaction.types";
import { positionFactory } from "../../shared/testing/factories/position";
import { assetFactory } from "../../shared/testing/factories/asset";

describe("position entity", () => {
	it.each([
		[[100, 50], 150],
		[[100, -50], 50],
		[[100], 100],
		[[100, 100, 100, -300], 0],
	])("quantity property", (quantities, expectedQuantity) => {
		const transactions = quantities.map((quantity) =>
			transactionFactory.build({
				quantity: Math.abs(quantity),
				operationType: quantity > 0 ? OperationTypes.BUY : OperationTypes.SELL,
			}),
		);

		const position = positionFactory.build({ transactions });

		expect(position.quantity).toBe(expectedQuantity);
	});

	it.each([
		[[10, 5], 7.5],
		[[10, -10], 0],
		[[10, 10, -5], 10],
		[[10, 20, -5], 15],
	])("unitPrice property", (unitPrices, expectedQuantity) => {
		const transactions = unitPrices.map((unitPrice) =>
			transactionFactory.build({
				quantity: 100,
				unitPrice: Math.abs(unitPrice),
				operationType: unitPrice > 0 ? OperationTypes.BUY : OperationTypes.SELL,
			}),
		);

		const position = positionFactory.build({ transactions });

		expect(position.unitPrice).toBe(expectedQuantity);
	});

	it.each([
		[[10, 20], 3000],
		[[10, 40], 5000],
	])("total property", (unitPrices, expectedQuantity) => {
		const transactions = unitPrices.map((unitPrice) =>
			transactionFactory.build({
				quantity: 100,
				unitPrice: Math.abs(unitPrice),
				operationType: unitPrice > 0 ? OperationTypes.BUY : OperationTypes.SELL,
			}),
		);

		const position = positionFactory.build({ transactions });

		expect(position.total).toBe(expectedQuantity);
	});

	it("validate throws invalid position when position.asset differs from transaction.asset", () => {
		const transaction = transactionFactory.build({
			asset: assetFactory.build({ ticker: "ONE" }),
			quantity: 50,
			unitPrice: 10,
			operationType: OperationTypes.BUY,
		});
		const transaction2 = transactionFactory.build({
			asset: assetFactory.build({ ticker: "ONE" }),
			quantity: 100,
			unitPrice: 10,
			operationType: OperationTypes.SELL,
		});

		expect(() =>
			positionFactory.build({ asset: { ticker: "ANOTHER" }, transactions: [transaction, transaction2] }),
		).toThrowError("Invalid position: transactions from different assets");
	});

	it("validate throws invalid position when transaction.asset differs among them", () => {
		const transaction = transactionFactory.build({
			asset: assetFactory.build({ ticker: "ONE" }),
			quantity: 50,
			unitPrice: 10,
			operationType: OperationTypes.BUY,
		});
		const transaction2 = transactionFactory.build({
			asset: assetFactory.build({ ticker: "ANOTHER" }),
			quantity: 100,
			unitPrice: 10,
			operationType: OperationTypes.SELL,
		});

		expect(() => positionFactory.build({ transactions: [transaction, transaction2] })).toThrowError(
			"Invalid position: transactions from different assets",
		);
	});

	it("validate quantity is negative", () => {
		const transaction = transactionFactory.build({
			quantity: 50,
			unitPrice: 10,
			operationType: OperationTypes.BUY,
		});
		const transaction2 = transactionFactory.build({
			quantity: 100,
			unitPrice: 10,
			operationType: OperationTypes.SELL,
		});

		expect(() => positionFactory.build({ transactions: [transaction, transaction2] })).toThrowError(
			"Invalid position: quantity is negative",
		);
	});
});
