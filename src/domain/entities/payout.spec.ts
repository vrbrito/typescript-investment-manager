import { describe, expect, it } from "vitest";
import { payoutFactory } from "../../shared/testing/factories/payout";

describe("payout entity", () => {
	it.each([0, -10])("validate throws invalid payout when amount: %d is zero or negative", (amount) => {
		expect(() =>
			payoutFactory.build({
				amount,
			}),
		).toThrowError("Invalid payout: amount is zero or negative");
	});
});
