import { InputCreateProductDto } from "./create.product.dto";
import CreatProductUseCase from "./create.product.usecase";


const input: InputCreateProductDto = {
    type: "a",
    name: "Product A",
    price: 10
    
}

const MockRepository = () =>{
    return {
        find: jest.fn(),
        findAll:jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test CreateProductUseCase", () => {
    it("Should create a product", async ()=> {
        const productRepository = MockRepository();
        const createProductUseCase = new CreatProductUseCase(productRepository);
        
        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id:expect.any(String),
            name: input.name,
            price:input.price
        })
    });

    it("Should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreatProductUseCase(productRepository);
        input.name = "";
        await expect(createProductUseCase.execute(input)).rejects.toThrow("name is required")
    })
})