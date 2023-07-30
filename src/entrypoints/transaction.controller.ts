import { Controller, Get, Post } from "@overnightjs/core";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { type Request, type Response } from "express";
import { type TransactionRepository } from "../adapters/repository/transaction.repository";
import { TransactionInput } from "../domain/entities/transaction.types";
import { InvalidTransaction } from "../domain/exceptions/transaction";
import { listTransactions, registerTransaction } from "../services/transaction.services";

@Controller("transactions")
export class TransactionController {
	public constructor(private readonly transactionRepository: TransactionRepository) {}

	@Get("")
	public async transactions(_: Request, res: Response): Promise<Response> {
		const transactions = await listTransactions(this.transactionRepository);

		return res.status(200).send(transactions);
	}

	@Post()
	public async addTransaction(req: Request, res: Response): Promise<Response> {
		const transactionInput: TransactionInput = plainToClass(TransactionInput, req.body);

		const errors = await validate(transactionInput, { validationError: { target: false } });
		if (errors.length > 0) {
			return res.status(400).send(errors);
		}

		try {
			await registerTransaction(this.transactionRepository, transactionInput);
		} catch (e) {
			if (e instanceof InvalidTransaction) {
				return res.status(400).send([e.message]);
			}

			throw e;
		}

		return res.status(201).send();
	}
}
