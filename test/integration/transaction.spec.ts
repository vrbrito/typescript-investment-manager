import supertest from "supertest";
import { describe, expect, it } from "vitest";

describe("transaction endpoints", () => {
	it("should list transactions", async () => {
		const client = supertest(global.app);
		const { body, status } = await client.get("/transactions");

		expect(status).toEqual(200);
		expect(body).toEqual([]);
	});
});
