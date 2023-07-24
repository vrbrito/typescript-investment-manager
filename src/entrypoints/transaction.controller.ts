import { Controller, Get, Post } from "@overnightjs/core";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { type Request, type Response } from "express";
import { type InMemoryTransactionRepository } from "../adapters/repository/transaction.repository";
import { TransactionInput } from "../domain/entities/transaction.types";
import { listTransactions, registerTransaction } from "../services/transaction.services";

@Controller("transactions")
export class TransactionController {
	public constructor(private readonly transactionRepository: InMemoryTransactionRepository) {}

	@Get("")
	public async transactions(_: Request, res: Response): Promise<void> {
		const transactions = await listTransactions(this.transactionRepository);

		res.status(200).send(transactions);
	}

	@Post()
	public async addTransaction(req: Request, res: Response): Promise<void> {
		const transactionInput: TransactionInput = plainToClass(TransactionInput, req.body);

		await validate(transactionInput, { validationError: { target: false } }).then((errors) => {
			if (errors.length > 0) {
				res.status(400).send(errors);
			}
		});

		await registerTransaction(this.transactionRepository, transactionInput);

		res.status(201).send();
	}
}
