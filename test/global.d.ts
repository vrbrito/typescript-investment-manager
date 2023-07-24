import { type Application } from "express";
import { type InMemoryPayoutRepository } from "../src/adapters/repository/payout.repository";
import { type InMemoryTransactionRepository } from "../src/adapters/repository/transaction.repository";
import { type ServerDependencies } from "../src/external/server";

interface TestServerDepedencies extends ServerDependencies {
	transactionRepository: InMemoryTransactionRepository;
	payoutRepository: InMemoryPayoutRepository;
}

declare global {
	// eslint-disable-next-line no-var
	var app: Application;

	// eslint-disable-next-line no-var
	var dependencies: TestServerDepedencies;
}

export {};
