import { type InMemoryTransactionRepository } from "../adapters/repository/transaction.repository";
import { Position } from "../domain/entities/position";
import { type ConsolidatedPosition } from "../domain/entities/position.types";

export async function listPositions(
	transactionRepository: InMemoryTransactionRepository,
): Promise<ConsolidatedPosition[]> {
	const transactions = await transactionRepository.findAll();

	return Position.consolidatePositions(transactions);
}
