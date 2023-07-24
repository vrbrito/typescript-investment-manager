import { Controller, Get, Post } from "@overnightjs/core";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { type Request, type Response } from "express";
import { type PayoutRepository } from "../adapters/repository/payout.repository";
import { PayoutInput } from "../domain/entities/payout.types";
import { listPayouts, registerPayout } from "../services/payout.services";

@Controller("payouts")
export class PayoutController {
	public constructor(private readonly payoutRepository: PayoutRepository) {}

	@Get()
	public async payouts(_: Request, res: Response): Promise<void> {
		const payouts = await listPayouts(this.payoutRepository);

		res.status(200).send(payouts);
	}

	@Post()
	public async addPayout(req: Request, res: Response): Promise<void> {
		const payoutInput: PayoutInput = plainToClass(PayoutInput, req.body);

		await validate(payoutInput, { validationError: { target: false } }).then((errors) => {
			if (errors.length > 0) {
				res.status(400).send(errors);
			}
		});

		await registerPayout(this.payoutRepository, payoutInput);

		res.status(201).send();
	}
}
