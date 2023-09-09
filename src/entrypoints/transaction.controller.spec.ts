import { instanceToPlain } from "class-transformer";
import supertest from "supertest";
import { describe, expect, it } from "vitest";
import { OperationTypes } from "../domain/entities/transaction.types";
import { assetFactory } from "../shared/testing/factories/asset";
import { transactionFactory } from "../shared/testing/factories/transaction";
import { convertDateToStr } from "../shared/testing/utils";

describe("transaction endpoints", () => {
	it("should list transactions", async () => {
		const sampleTransactions = transactionFactory.buildList(2);
		global.dependencies.transactionRepository.transactions.push(...sampleTransactions);

		const client = supertest(global.app);
		const { body, status } = await client.get("/transactions");

		expect(status).toEqual(200);
		expect(body).toEqual(sampleTransactions.map(convertDateToStr));
	});

	it("should succeed registering transaction", async () => {
		const sampleTransaction = transactionFactory.build();
		const input = instanceToPlain(sampleTransaction);

		const client = supertest(global.app);
		const { body, status } = await client.post("/transactions").send(input);

		expect(status).toEqual(201);
		expect(body).toEqual({});
	});

	it("should fail registering transaction, invalid transaction due to position", async () => {
		const asset = assetFactory.build({ ticker: "WEGE3" });
		const sampleTransaction = transactionFactory.build({ asset, operationType: OperationTypes.SELL });
		const input = instanceToPlain(sampleTransaction);

		const client = supertest(global.app);
		const { body, status } = await client.post("/transactions").send(input);

		expect(status).toEqual(400);
		expect(body).toEqual(["Invalid transaction: invalid quantity for current position"]);
	});

	it("should fail registering transaction, validation error", async () => {
		const client = supertest(global.app);
		const { body, status } = await client.post("/transactions").send({});

		expect(status).toEqual(400);
		expect(body).toEqual([
			{
				children: [],
				constraints: {
					isDate: "date must be a Date instance",
					isDefined: "date should not be null or undefined",
				},
				property: "date",
			},
			{
				children: [],
				constraints: {
					isDefined: "owner should not be null or undefined",
					minLength: "owner must be longer than or equal to 3 characters",
				},
				property: "owner",
			},
			{
				children: [],
				constraints: {
					isDefined: "broker should not be null or undefined",
					minLength: "broker must be longer than or equal to 5 characters",
				},
				property: "broker",
			},
			{
				children: [],
				constraints: {
					isDefined: "asset should not be null or undefined",
				},
				property: "asset",
			},
			{
				children: [],
				constraints: {
					isDefined: "operationType should not be null or undefined",
					isEnum: "operationType must be one of the following values: buy, sell",
				},
				property: "operationType",
			},
			{
				children: [],
				constraints: {
					isDefined: "quantity should not be null or undefined",
					isPositive: "quantity must be a positive number",
				},
				property: "quantity",
			},
			{
				children: [],
				constraints: {
					isDefined: "unitPrice should not be null or undefined",
					isPositive: "unitPrice must be a positive number",
				},
				property: "unitPrice",
			},
		]);
	});
});
