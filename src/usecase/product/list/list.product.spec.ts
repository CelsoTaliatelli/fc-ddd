import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
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

    it("should list products", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("123","Product update",15);
        const product2 = new Product("567","Product B",200);

        await productRepository.create(product);
        await productRepository.create(product2);

        const useCase = new ListProductUseCase(productRepository);

        const result = await useCase.execute({});

        const retorno = [product,product2];

        
        expect(result.products.length).toBe(2);

    })
})