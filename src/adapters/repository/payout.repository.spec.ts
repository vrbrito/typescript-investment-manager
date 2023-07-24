import { describe, expect, it } from "vitest";
import { payoutFactory } from "../../shared/testing/factories/payout";
import { InMemoryPayoutRepository } from "./payout.repository";

const payout = payoutFactory.build();

describe("payout in memory repository", () => {
	it("add payout", async () => {
		const repo = new InMemoryPayoutRepository();

		await repo.add(payout);

		const payouts = repo.payouts;

		expect(payouts).toContain(payout);
		expect(payouts.length).toBe(1);
	});

	it("findAll payouts", async () => {
		const repo = new InMemoryPayoutRepository([]);

		let payouts = await repo.findAll();
		expect(payouts).toEqual([]);

		repo.payouts.push(payout);

		payouts = await repo.findAll();
		expect(payouts).toEqual([payout]);
	});

	it("clear all payouts", async () => {
		const repo = new InMemoryPayoutRepository();

		repo.payouts.push(...payoutFactory.buildList(2));

		expect(repo.payouts).toHaveLength(2);

		repo.clear();

		expect(repo.payouts).toHaveLength(0);
	});
});
