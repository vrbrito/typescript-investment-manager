import supertest from "supertest";
import { describe, expect, it } from "vitest";

describe("payout endpoints", () => {
	it("should list payouts", async () => {
		const client = supertest(global.app);
		const { body, status } = await client.get("/payouts");

		expect(status).toEqual(200);
		expect(body).toEqual([]);
	});
});
