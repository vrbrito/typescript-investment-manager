import { describe, expect, it } from "vitest";
import { InMemoryPayoutRepository } from "../adapters/repository/payout.repository";
import { type PayoutInput } from "../domain/entities/payout.types";
import { assetFactory } from "../shared/testing/factories/asset";
import { payoutFactory } from "../shared/testing/factories/payout";
import { listPayouts, registerPayout } from "./payout.services";

describe("payout services", async () => {
	it("register payout", async () => {
		const repo = new InMemoryPayoutRepository([]);
		const input: PayoutInput = {
			date: new Date(),
			owner: "Test",
			broker: "Bank",
			asset: assetFactory.build(),
			amount: 100,
		};

		await registerPayout(repo, input);

		const expectedPayout = payoutFactory.build(input);
		expect(repo.payouts).toContainEqual(expectedPayout);
	});

	it("list payouts", async () => {
		const samplePayouts = payoutFactory.buildList(2);

		const repo = new InMemoryPayoutRepository(samplePayouts);
		const payouts = await listPayouts(repo);

		expect(payouts).toEqual(samplePayouts);
	});

	it("list payouts, empty repository", async () => {
		const repo = new InMemoryPayoutRepository();
		const payouts = await listPayouts(repo);

		expect(payouts).toEqual([]);
	});
});
