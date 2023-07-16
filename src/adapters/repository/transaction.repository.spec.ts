import { describe, expect, it } from "vitest";
import { InMemoryTransactionRepository } from "./transaction.repository";
import { Transaction } from "../../domain/entities/transaction";
import { OperationTypes } from "../../domain/entities/transaction.types";
import { Asset } from "../../domain/value_objects/asset";
import { AssetClasses } from "../../domain/value_objects/asset.types";

const sampleAsset = new Asset("HSML11", AssetClasses.FIIS);
const sampleTransaction = new Transaction(
  new Date(),
  "Vitor",
  "Inter",
  sampleAsset,
  OperationTypes.BUY,
  100,
  10
);

describe("transaction in memory repository", () => {
  it("add transaction", async () => {
    const repo = new InMemoryTransactionRepository();

    await repo.add(sampleTransaction);

    const transactions = repo["_transactions"];

    expect(transactions).toContain(sampleTransaction);
    expect(transactions.length).toBe(1);
  });

  it("findAll transactions", async () => {
    const repo = new InMemoryTransactionRepository([]);

    let transactions = await repo.findAll();
    expect(transactions).toEqual([]);

    repo["_transactions"].push(sampleTransaction);

    transactions = await repo.findAll();
    expect(transactions).toEqual([sampleTransaction]);
  });
});
