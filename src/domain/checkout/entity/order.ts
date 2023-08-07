
import { OrderStatus } from "../value-object/order-status.enum";
import OrderItem from "./order_item";

export default class Order {
    private _id!: string;
    private _customer_id!:string;
    private _items!: OrderItem[];
    private _total!: number;
    private _status!: OrderStatus;

    constructor(id:string, customerId: string, items:OrderItem[]) {
        this._id = id;
        this._customer_id = customerId;
        this._items = items;
        this._status = OrderStatus.PENDING;
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customer_id;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    updateStatus(status:OrderStatus):void {
        this._status = status;
    }

    get status(): OrderStatus {
        return this._status;
    }

    total() {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(),0);
    }
}