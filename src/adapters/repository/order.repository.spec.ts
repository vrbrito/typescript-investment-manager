import { describe, expect, it } from "vitest";
import { InMemoryOrderRepository } from "./order.repository";
import { Order } from "../../domain/entities/order";
import { OperationTypes } from "../../domain/entities/order.types";
import { Asset } from "../../domain/value_objects/asset";
import { AssetClasses } from "../../domain/value_objects/asset.types";

const sampleAsset = new Asset("HSML11", AssetClasses.FIIS);
const sampleOrder = new Order(
  new Date(),
  "Vitor",
  "Inter",
  sampleAsset,
  OperationTypes.BUY,
  100,
  10
);

describe("order in memory repository", () => {
  it("add order", async () => {
    const repo = new InMemoryOrderRepository();

    await repo.add(sampleOrder);

    const orders = repo["_orders"];

    expect(orders).toContain(sampleOrder);
    expect(orders.length).toBe(1);
  });

  it("findAll orders", async () => {
    const repo = new InMemoryOrderRepository([]);

    let orders = await repo.findAll();
    expect(orders).toEqual([]);

    repo["_orders"].push(sampleOrder);

    orders = await repo.findAll();
    expect(orders).toEqual([sampleOrder]);
  });
});
