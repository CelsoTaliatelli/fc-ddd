import Address from "./address";

export default class Customer {
    private _id!: string;
    private _name!: string;
    private _address!: Address;
    private _active!: boolean;
    private _rewardPoints: number = 0;

    constructor(id:string, name: string){
        this._name = name;
        this._id = id;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    changeName(name:string): string{
        return this._name = name
    }

    validate(){
        if(this._id.length === 0) {
            throw new Error('Id is required');
        };
        if(this._name === "") {
            throw new Error('name is required');
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
}