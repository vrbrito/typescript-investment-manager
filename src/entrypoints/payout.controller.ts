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
	public async payouts(_: Request, res: Response): Promise<Response> {
		const payouts = await listPayouts(this.payoutRepository);

		return res.status(200).send(payouts);
	}

	@Post()
	public async addPayout(req: Request, res: Response): Promise<Response> {
		const payoutInput: PayoutInput = plainToClass(PayoutInput, req.body);

		const errors = await validate(payoutInput, { validationError: { target: false } });
		if (errors.length > 0) {
			return res.status(400).send(errors);
		}

		await registerPayout(this.payoutRepository, payoutInput);

		return res.status(201).send();
	}
}
