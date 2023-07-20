import Address from "./address";

class Customer {
    private _id!: string;
    private _name!: string;
    private _address!: Address;
    private _active!: boolean;

    constructor(id:string, name: string){
        this._name = name;
        this._id = id;
    }

    changeName(): string{
        return this._name
    }

    active(){
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    set Address(address: Address){
        this._address = address;
    }
}