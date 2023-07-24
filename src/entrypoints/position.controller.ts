import { Controller, Get } from "@overnightjs/core";
import { type Request, type Response } from "express";
import { type InMemoryTransactionRepository } from "../adapters/repository/transaction.repository";
import { listPositions } from "../services/position.services";

@Controller("positions")
export class PositionController {
	public constructor(private readonly transactionRepository: InMemoryTransactionRepository) {}

	@Get()
	public async positions(_: Request, res: Response): Promise<void> {
		const payouts = await listPositions(this.transactionRepository);

		res.status(200).send(payouts);
	}
}
