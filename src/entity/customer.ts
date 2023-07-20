class Customer {
    private _id!: string;
    private _name!: string;
    private _address!: string;

    constructor(id:string, name: string, address:string){
        this._name = name;
        this._id = id;
        this._address = address;
    }

    get name(): string{
        return this._name
    }
}