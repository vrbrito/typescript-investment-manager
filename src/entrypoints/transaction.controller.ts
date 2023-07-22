import { Controller, Get } from "@overnightjs/core";
import { type Request, type Response } from "express";
import { type InMemoryTransactionRepository } from "../adapters/repository/transaction.repository";
import { listTransactions } from "../services/transaction.services";

@Controller("transactions")
export class TransactionController {
	public constructor(private readonly transactionRepository: InMemoryTransactionRepository) {}

	@Get("")
	public async transactions(_: Request, res: Response): Promise<void> {
		const transactions = await listTransactions(this.transactionRepository);

		res.status(200).send(transactions);
	}
}
