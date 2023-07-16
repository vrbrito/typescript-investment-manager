import { Order } from "../../domain/entities/order";

export interface OrderRepository {
  add(order: Order): Promise<void>;
  findAll(): Promise<Order[]>;
}

export class InMemoryOrderRepository implements OrderRepository {
  private _orders: Order[];

  public constructor(orders: Order[] = []) {
    this._orders = orders;
  }

  public async add(order: Order): Promise<void> {
    this._orders.push(order);
  }

  public async findAll(): Promise<Order[]> {
    return this._orders;
  }
}
