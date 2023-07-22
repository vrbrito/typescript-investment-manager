import { Controller, Get } from "@overnightjs/core";
import { type Request, type Response } from "express";
import { type InMemoryPayoutRepository } from "../adapters/repository/payout.repository";
import { listPayouts } from "../services/payout.services";

@Controller("payouts")
export class PayoutController {
	public constructor(private readonly payoutRepository: InMemoryPayoutRepository) {}

	@Get("")
	public async payouts(_: Request, res: Response): Promise<void> {
		const payouts = await listPayouts(this.payoutRepository);

		res.status(200).send(payouts);
	}
}
