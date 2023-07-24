import { describe, expect, it } from "vitest";
import { transactionFactory } from "../../shared/testing/factories/transaction";
import { OperationTypes } from "./transaction.types";

describe("transaction entity", () => {
	it.each([
		[100, OperationTypes.BUY, 100],
		[200, OperationTypes.SELL, -200],
	])(
		"signed quantity property for (quantity: %d, operationType: %s) should be (%d)",
		(quantity, operationType, expectedSignedQuantity) => {
			const transaction = transactionFactory.build({
				quantity,
				operationType,
			});

			expect(transaction.signedQuantity).toBe(expectedSignedQuantity);
		},
	);

	it.each([
		[100, 10, OperationTypes.BUY, 1000],
		[15.5, 2, OperationTypes.SELL, -31.0],
	])(
		"total property for (quantity: %d, unit price: %d, operationType: %s) should be (%d)",
		(quantity, unitPrice, operationType, expectedTotal) => {
			const transaction = transactionFactory.build({
				quantity,
				unitPrice,
				operationType,
			});

			expect(transaction.total).toBe(expectedTotal);
		},
	);

	it.each([
		["2023-01-01T00:00:00.000Z", 2023],
		["2022-12-31T00:00:00.000Z", 2022],
	])("year property for (date: %s) should be (%d)", (dateStr, expectedYear) => {
		const transaction = transactionFactory.build({
			date: new Date(dateStr),
		});

		expect(transaction.year).toBe(expectedYear);
	});

	it.each([
		["2023-06-01T00:00:00.000Z", 6],
		["2022-12-31T00:00:00.000Z", 12],
	])("month property for (date: %s) should be (%d)", (dateStr, expectedMonth) => {
		const transaction = transactionFactory.build({
			date: new Date(dateStr),
		});

		expect(transaction.month).toBe(expectedMonth);
	});
});
