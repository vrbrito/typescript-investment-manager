import { type Payout } from "../../domain/entities/payout";

export interface PayoutRepository {
	add: (payout: Payout) => Promise<void>;
	findAll: () => Promise<Payout[]>;
}

export class InMemoryPayoutRepository implements PayoutRepository {
	public constructor(public payouts: Payout[] = []) {}

	public async add(payout: Payout): Promise<void> {
		this.payouts.push(payout);
	}

	public async findAll(): Promise<Payout[]> {
		return this.payouts;
	}

	public clear(): void {
		this.payouts = [];
	}
}
