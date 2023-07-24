import { Controller, Get } from "@overnightjs/core";
import { type Request, type Response } from "express";
import { type TransactionRepository } from "../adapters/repository/transaction.repository";
import { listPositions, listPositionsByOwner } from "../services/position.services";

@Controller("positions")
export class PositionController {
	public constructor(private readonly transactionRepository: TransactionRepository) {}

	@Get()
	public async positions(_: Request, res: Response): Promise<void> {
		const payouts = await listPositions(this.transactionRepository);

		res.status(200).send(payouts);
	}

	@Get(":owner")
	public async positionsByOwner(req: Request, res: Response): Promise<void> {
		const selectedOwner = req.params.owner;

		const payouts = await listPositionsByOwner(this.transactionRepository, selectedOwner);

		res.status(200).send(payouts);
	}
}
