import { Transaction } from "../../domain/entities/transaction";

export interface TransactionRepository {
  add(transaction: Transaction): Promise<void>;
  findAll(): Promise<Transaction[]>;
}

export class InMemoryTransactionRepository implements TransactionRepository {
  private _transactions: Transaction[];

  public constructor(transactions: Transaction[] = []) {
    this._transactions = transactions;
  }

  public async add(transaction: Transaction): Promise<void> {
    this._transactions.push(transaction);
  }

  public async findAll(): Promise<Transaction[]> {
    return this._transactions;
  }
}
