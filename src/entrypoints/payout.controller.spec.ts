import { instanceToPlain } from "class-transformer";
import supertest from "supertest";
import { describe, expect, it } from "vitest";
import { payoutFactory } from "../shared/testing/factories/payout";

describe("payout endpoints", () => {
	it("should list payouts", async () => {
		const client = supertest(global.app);
		const { body, status } = await client.get("/payouts");

		expect(status).toEqual(200);
		expect(body).toEqual([]);
	});

	it("should fail registering payout (validation error)", async () => {
		const client = supertest(global.app);
		const { body, status } = await client.post("/payouts").send({});

		expect(status).toEqual(400);
		expect(body).toEqual([
			{
				children: [],
				constraints: {
					isDefined: "date should not be null or undefined",
					isDate: "date must be a Date instance",
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
					minLength: "broker must be longer than or equal to 3 characters",
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
					isDefined: "amount should not be null or undefined",
					isPositive: "amount must be a positive number",
				},
				property: "amount",
			},
		]);
	});

	it("should succeed registering payout", async () => {
		const samplePayout = payoutFactory.build();
		const input = instanceToPlain(samplePayout);

		const client = supertest(global.app);
		const { body, status } = await client.post("/payouts").send(input);

		expect(status).toEqual(201);
		expect(body).toEqual({});
	});
});
