import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";


export default class Customer extends Entity {
    private _name!: string;
    private _address!: Address;
    private _active!: boolean;
    private _rewardPoints: number = 0;

    constructor(id:string, name: string){
        super();
        this._name = name;
        this._id = id;
        this._active = false;
        this.validate();
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get id(): string {
        return this._id;
    }

    changeName(name:string): string{
        return this._name = name
    }

    validate(){
        if(this._id.length === 0) {
            this.notification.addError({
                message: 'Id is required',
                context:'customer'
            })
        };
        if(this._name === "") {
            this.notification.addError({
                message: 'name is required',
                context:'customer'
            })
        }
    }

    activate(){
        if(this._address === undefined){
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    deactivate(){
        this._active = false;
    }

    isActive():boolean {
        return this._active;
    }

    get name() :string{
        return this._name
    }

    set Address(address: Address){
        this._address = address;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    get Address(): Address {
        return this._address;
    }
}