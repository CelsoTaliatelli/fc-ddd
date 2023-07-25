export default class OrderItem {
    private _id!: string;
    private product_id !:string;
    private _name!:string;
    private _price!:number;
    private _quantity!:number;

    constructor(id:string, name:string, price:number, quantity:number, productId:string){
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this.product_id = productId
    }

    get price():number {
        return this._price;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

}