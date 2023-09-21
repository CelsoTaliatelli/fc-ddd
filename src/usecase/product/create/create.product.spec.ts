import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import CreatProductUseCase from "./create.product.usecase";
import { InputCreateProductDto } from "./create.product.dto";

describe("Test find product use case", () => {
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

    it("should create a product", async () => {

        const productRepository = new ProductRepository();

        const useCase = new CreatProductUseCase(productRepository);
        const input = {
            type: "a",
            name:"Product A",
            price: 10
        }
        
        const result = await useCase.execute(input as InputCreateProductDto);

        const output = {
            id: expect.any(String),
            name: "Product A",
            price: 10
           
        }

        expect(result).toEqual(output);

    })
})