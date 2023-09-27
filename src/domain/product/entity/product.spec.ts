import Product from "./product";

describe("Product unit tests", () => {
    
    it('should throw error when id is empty', () => {
       expect(() => {
            let product = new Product("","Product 1",100)
       }).toThrowError('product: Id is required');
    });
})