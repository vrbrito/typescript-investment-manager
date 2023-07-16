import { describe, expect, it } from "vitest";
import { Transaction } from "./transaction";
import { OperationTypes } from "./transaction.types";
import { Asset } from "../value_objects/asset";
import { AssetClasses } from "../value_objects/asset.types";

const sampleAsset = new Asset("HSML11", AssetClasses.FIIS);

describe("transaction entity", () => {
  it.each([
    [100, 10, 1000],
    [20, 4, 80],
    [15.5, 2, 31.0],
  ])(
    "total property for (quantity: %d, unit price: %d) should be (%d)",
    (quantity, unitPrice, expectedTotal) => {
      const currentDate = new Date();

      const transaction = new Transaction(
        currentDate,
        "Vitor",
        "Inter",
        sampleAsset,
        OperationTypes.BUY,
        quantity,
        unitPrice
      );

      expect(transaction.total).toBe(expectedTotal);
    }
  );

  it.each([
    ["2023-01-01T00:00:00.000Z", 2023],
    ["2022-12-31T00:00:00.000Z", 2022],
  ])("year property for (date: %s) should be (%d)", (date, expectedYear) => {
    const transaction = new Transaction(
      new Date(date),
      "Vitor",
      "Inter",
      sampleAsset,
      OperationTypes.BUY,
      100,
      10
    );

    expect(transaction.year).toBe(expectedYear);
  });

  it.each([
    ["2023-06-01T00:00:00.000Z", 6],
    ["2022-12-31T00:00:00.000Z", 12],
  ])("month property for (date: %s) should be (%d)", (date, expectedMonth) => {
    const transaction = new Transaction(
      new Date(date),
      "Vitor",
      "Inter",
      sampleAsset,
      OperationTypes.BUY,
      100,
      10
    );

    expect(transaction.month).toBe(expectedMonth);
  });
});
