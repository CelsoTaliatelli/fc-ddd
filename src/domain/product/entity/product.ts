import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface{
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number){
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate(){
        if(this._id === ""){
            this.notification.addError({
                message:'Id is required',
                context:'product'
            });
        };
        if(this._name === ""){
            this.notification.addError({
                message:'name is required',
                context:'product'
            })
        }
    }

    changePrice(price:number) {
        this._price = price;
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