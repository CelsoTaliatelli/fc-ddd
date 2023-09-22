import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product = new Product("123","Product update",15);
const product2 = new Product("567","Product B",200);

const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    };
  };
  

describe("Unit Test list product use case", () => {
   

    it("should list products", async () => {

        const productRepository = MockRepository();

        const useCase = new ListProductUseCase(productRepository);

        const result = await useCase.execute({});

        
        expect(result.products.length).toBe(2);

    })
})