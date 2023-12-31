import { Router } from "express";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import {app, sequelize}  from "../express";
import request from "supertest";
describe("E2E test for product", () => {

    beforeEach(async ()=> {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });
    it("Should list products", async () => {

        const product = new Product("123","Product A",10);
        const product2 = new Product("567","Product B",12);

        const repository = new ProductRepository();
        await repository.create(product);
        await repository.create(product2);

        const response = await request(app)
            .get("/product")

            expect(response.status).toBe(200);
            expect(response.body.products.length).toBe(2)
            expect(response.body.products[0].id).toBe("123")
            expect(response.body.products[1].id).toBe("567")
    });

    it("Should list products in json and xml", async () => {

        const product = new Product("123","Product A",10);
        const product2 = new Product("567","Product B",12);

        const repository = new ProductRepository();
        await repository.create(product);
        await repository.create(product2);

        const response = await request(app)
            .get("/product")

            expect(response.status).toBe(200);
            expect(response.body.products.length).toBe(2)
            expect(response.body.products[0].id).toBe("123")
            expect(response.body.products[1].id).toBe("567")

        const listResponseXML = await request(app)
            .get("/product")
            .set("Accept","Application/xml")
            .send();

            expect(listResponseXML.status).toBe(200);
            expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
            expect(listResponseXML.text).toContain(`<products>`);
            expect(listResponseXML.text).toContain(`<product>`);
            expect(listResponseXML.text).toContain(`<name>Product A</name>`);
    });
})