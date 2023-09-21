import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";
import { InputUpdateProductDto } from "./update.product.dto";

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage:":memory:",
            logging:false,
            sync:{force: true}
        })

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should update a product", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("123","Product update",15);

        await productRepository.create(product);

        const useCase = new UpdateProductUseCase(productRepository);
        const input = {
            id: product.id,
            name: product.name,
            price: 25
        }
        
        const result = await useCase.execute(input as InputUpdateProductDto);

        const output = {
            id: expect.any(String),
            name: "Product update",
            price: 25
           
        }

        expect(result).toEqual(output);

    })
})