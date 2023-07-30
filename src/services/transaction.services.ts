import { type TransactionRepository } from "../adapters/repository/transaction.repository";
import { Transaction } from "../domain/entities/transaction";
import { type TransactionInput } from "../domain/entities/transaction.types";
import { InvalidTransaction } from "../domain/exceptions/transaction";
import { checkIfValidPosition } from "./position.services";

export async function registerTransaction(
	transactionRepository: TransactionRepository,
	transactionInput: TransactionInput,
): Promise<void> {
	const { date, owner, broker, asset, operationType, quantity, unitPrice } = transactionInput;

	const transaction = new Transaction(date, owner, broker, asset, operationType, quantity, unitPrice);

	const isValidPosition = await checkIfValidPosition(transactionRepository, transaction);
	if (!isValidPosition) {
		throw new InvalidTransaction("invalid quantity for current position");
	}

	await transactionRepository.add(transaction);
}

export async function listTransactions(transactionRepository: TransactionRepository): Promise<Transaction[]> {
	return await transactionRepository.findAll();
}
