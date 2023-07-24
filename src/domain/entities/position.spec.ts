import { describe, expect, it } from "vitest";
import { assetFactory } from "../../shared/testing/factories/asset";
import { positionFactory } from "../../shared/testing/factories/position";
import { transactionFactory } from "../../shared/testing/factories/transaction";
import { Position } from "./position";
import { type ConsolidatedPosition } from "./position.types";
import { OperationTypes } from "./transaction.types";

describe("position entity", () => {
	it.each([
		[[100, 50], 150],
		[[100, -50], 50],
		[[100], 100],
		[[100, 100, 100, -300], 0],
		[[100, -100, 200], 200],
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
		[[10, -10, 20], 20],
		[[10, -10, 10, 10, -10, -10, 20], 20],
	])("unitPrice property only takes openTransactions into account", (unitPrices, expectedQuantity) => {
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

	it("consolidate positions", () => {
		const asset1 = assetFactory.build({ ticker: "Asset 1" });
		const asset2 = assetFactory.build({ ticker: "Asset 2" });

		// transactions for asset 1 even out
		const transactionAsset1 = transactionFactory.build({
			asset: asset1,
			operationType: OperationTypes.BUY,
			quantity: 10,
			unitPrice: 10,
		});
		const transaction2Asset1 = transactionFactory.build({
			asset: asset1,
			operationType: OperationTypes.SELL,
			quantity: 10,
			unitPrice: 10,
		});

		// transactions for asset 2
		const transactionAsset2 = transactionFactory.build({
			asset: asset2,
			operationType: OperationTypes.BUY,
			quantity: 100,
			unitPrice: 10,
		});

		const consolidatedPositions = Position.consolidatePositions([
			transactionAsset1,
			transaction2Asset1,
			transactionAsset2,
		]);

		const expectedConsolidatedPosition: ConsolidatedPosition = {
			asset: asset2,
			transactions: [transactionAsset2],
			total: 1000,
			quantity: 100,
			unitPrice: 10,
		};

		expect(consolidatedPositions).toHaveLength(1);
		expect(consolidatedPositions).toContainEqual(expectedConsolidatedPosition);
	});
});
