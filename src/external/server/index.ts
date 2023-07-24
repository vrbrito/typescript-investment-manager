import { Server } from "@overnightjs/core";
import bodyParser from "body-parser";
import { type Application } from "express";
import { InMemoryPayoutRepository, type PayoutRepository } from "../../adapters/repository/payout.repository";
import {
	InMemoryTransactionRepository,
	type TransactionRepository,
} from "../../adapters/repository/transaction.repository";
import { PayoutController } from "../../entrypoints/payout.controller";
import { PositionController } from "../../entrypoints/position.controller";
import { TransactionController } from "../../entrypoints/transaction.controller";

export interface ServerDependencies {
	transactionRepository: TransactionRepository;
	payoutRepository: PayoutRepository;
}

export class SetupServer extends Server {
	public readonly dependencies: ServerDependencies;

	public constructor(private readonly port: number = 3000) {
		super();

		this.dependencies = this.initializeDependencies();
	}

	public init(): void {
		this.setupExpress();
		this.setupControllers();
	}

	public initializeDependencies(): ServerDependencies {
		return {
			transactionRepository: new InMemoryTransactionRepository(),
			payoutRepository: new InMemoryPayoutRepository(),
		};
	}

	private setupExpress(): void {
		this.app.use(bodyParser.json());
	}

	private setupControllers(): void {
		const transactionController = new TransactionController(this.dependencies.transactionRepository);
		const positionController = new PositionController(this.dependencies.transactionRepository);
		const payoutController = new PayoutController(this.dependencies.payoutRepository);

		this.addControllers([transactionController, payoutController, positionController]);
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
