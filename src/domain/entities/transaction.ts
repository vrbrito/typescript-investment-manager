import { Asset } from "../value_objects/asset";
import { OperationTypes } from "./transaction.types";

export class Transaction {
  public readonly date: Date;
  public readonly owner: string;
  public readonly broker: string;
  public readonly asset: Asset;
  public readonly operationType: OperationTypes;
  public readonly quantity: number;
  public readonly unitPrice: number;
  public readonly isOpenPosition?: boolean;

  public constructor(
    date: Date,
    owner: string,
    broker: string,
    asset: Asset,
    operationType: OperationTypes,
    quantity: number,
    unitPrice: number
  ) {
    this.date = date;
    this.owner = owner;
    this.broker = broker;
    this.asset = asset;
    this.operationType = operationType;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  public get total(): number {
    return this.quantity * this.unitPrice;
  }

  public get year(): number {
    return this.date.getUTCFullYear();
  }

  public get month(): number {
    return this.date.getUTCMonth() + 1;
  }
}
