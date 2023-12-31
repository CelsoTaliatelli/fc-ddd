import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface{
    private _id:string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number){
        this._id = id;
        this._name = name;
        this._price = price *2;
        this.validate();
    }

    validate(){
        if(this._id === ""){
            throw new Error("Id is required");
        }
    }

    changePrice(price:number) {
        this._price = price * 2;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}