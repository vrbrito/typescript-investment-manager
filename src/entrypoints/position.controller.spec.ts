import supertest from "supertest";
import { describe, expect, it } from "vitest";

describe("position endpoints", () => {
	it("should list positions", async () => {
		const client = supertest(global.app);
		const { body, status } = await client.get("/positions");

		expect(status).toEqual(200);
		expect(body).toEqual([]);
	});
});
