import OrderItem from "./order_item";

export default class Order {
    private _id!: string;
    private _customer_id!:string;
    private _items!: OrderItem[];
    private _total!: number;

    constructor(id:string, customerId: string, items:OrderItem[]) {
        this._id = id;
        this._customer_id = customerId;
        this._items = items
    }

    total() {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(),0);
    }
}