import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {
    it("Should create a customer", () => {
        let customer = CustomerFactory.create("John");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();
    });

    it("Should create a customer with address", () => {
        const address = new Address("Street",1,"zip","city");
        let customer = CustomerFactory.createWithAddress("John",address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);
    })
})

