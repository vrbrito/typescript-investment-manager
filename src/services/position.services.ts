import { type TransactionRepository } from "../adapters/repository/transaction.repository";
import { Position } from "../domain/entities/position";
import { type ConsolidatedPosition } from "../domain/entities/position.types";
import { type Transaction } from "../domain/entities/transaction";
import { type Asset } from "../domain/value_objects/asset";

export async function listPositions(transactionRepository: TransactionRepository): Promise<ConsolidatedPosition[]> {
	const transactions = await transactionRepository.findAll();

	return Position.consolidatePositions(transactions);
}

export async function listPositionsByOwner(
	transactionRepository: TransactionRepository,
	owner: string,
): Promise<ConsolidatedPosition[]> {
	const transactions = await transactionRepository.findBy({ owner });

	return Position.consolidatePositions(transactions);
}

export async function getPosition(
	transactionRepository: TransactionRepository,
	owner: string,
	asset: Asset,
): Promise<Position> {
	const transactions = await transactionRepository.findBy({ owner, asset });
	const position = new Position(asset, transactions);

	return position;
}

export async function checkIfValidPosition(
	transactionRepository: TransactionRepository,
	transaction: Transaction,
): Promise<boolean> {
	const position = await getPosition(transactionRepository, transaction.owner, transaction.asset);

	return position.quantity + transaction.signedQuantity >= 0;
}
