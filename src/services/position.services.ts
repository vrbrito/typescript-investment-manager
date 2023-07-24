import { type TransactionRepository } from "../adapters/repository/transaction.repository";
import { Position } from "../domain/entities/position";
import { type ConsolidatedPosition } from "../domain/entities/position.types";

export async function listPositions(transactionRepository: TransactionRepository): Promise<ConsolidatedPosition[]> {
	const transactions = await transactionRepository.findAll();

	return Position.consolidatePositions(transactions);
}
