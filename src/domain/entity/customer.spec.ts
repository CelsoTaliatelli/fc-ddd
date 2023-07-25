import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    
    it('should throw error when id is empty', () =>{
        
        expect(() => {
            let customer = new Customer("","John");
        }).toThrowError("Id is required");
    });

    it('should throw error when name is ""', () =>{
        
        expect(() => {
            let customer = new Customer("1","");
        }).toThrowError("name is required");
    });

    it('should change name', () =>{
        let customer = new Customer("1","John");
        customer.changeName("Jimi");
        expect(customer.name).toBe("Jimi");        
    });

    it('should activate customer', () =>{
            let customer = new Customer("1","John");
            const address = new Address("Rua dois", 2, "12345-789", "SP");
            customer.Address =  address;
            customer.activate();
            expect(customer.isActive()).toBe(true);
    });

    it('should deactivate customer', () =>{
        let customer = new Customer("1","John");
        const address = new Address("Rua dois", 2, "12345-789", "SP");
        customer.Address =  address;
        customer.deactivate()
        expect(customer.isActive()).toBe(false);
    });
})