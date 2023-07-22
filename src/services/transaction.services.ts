import { type TransactionRepository } from "../adapters/repository/transaction.repository";
import { Transaction } from "../domain/entities/transaction";
import { type TransactionInput } from "../domain/entities/transaction.types";

export async function registerTransaction(
	transactionRepository: TransactionRepository,
	transactionInput: TransactionInput,
): Promise<void> {
	const { date, owner, broker, asset, operationType, quantity, unitPrice } = transactionInput;

	const transaction = new Transaction(date, owner, broker, asset, operationType, quantity, unitPrice);
	await transactionRepository.add(transaction);
}

export async function listTransactions(transactionRepository: TransactionRepository): Promise<Transaction[]> {
	return await transactionRepository.findAll();
}
