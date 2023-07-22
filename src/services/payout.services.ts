import { type PayoutRepository } from "../adapters/repository/payout.repository";
import { Payout } from "../domain/entities/payout";
import { type PayoutInput } from "../domain/entities/payout.types";

export async function registerPayout(payoutRepository: PayoutRepository, payoutInput: PayoutInput): Promise<void> {
	const { date, owner, broker, asset, amount } = payoutInput;

	const payout = new Payout(date, owner, broker, asset, amount);
	await payoutRepository.add(payout);
}

export async function listPayouts(payoutRepository: PayoutRepository): Promise<Payout[]> {
	return await payoutRepository.findAll();
}
