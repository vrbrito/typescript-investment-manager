import { Server } from "@overnightjs/core";
import bodyParser from "body-parser";
import { type Application } from "express";
import { InMemoryPayoutRepository } from "../../adapters/repository/payout.repository";
import { InMemoryTransactionRepository } from "../../adapters/repository/transaction.repository";
import { PayoutController } from "../../entrypoints/payout.controller";
import { TransactionController } from "../../entrypoints/transaction.controller";

export class SetupServer extends Server {
	public constructor(private readonly port = 3000) {
		super();
	}

	public init(): void {
		this.setupExpress();
		this.setupControllers();
	}

	private setupExpress(): void {
		this.app.use(bodyParser.json());
	}

	private setupControllers(): void {
		// TODO: move repo initialization to other method
		const transactionRepository = new InMemoryTransactionRepository();
		const payoutRepository = new InMemoryPayoutRepository();

		const transactionController = new TransactionController(transactionRepository);
		const payoutController = new PayoutController(payoutRepository);

		this.addControllers([transactionController, payoutController]);
	}

	public getApp(): Application {
		return this.app;
	}

	public start(): void {
		this.app.listen(this.port, () => {
			console.info("Server listening on port:", this.port);
		});
	}
}
