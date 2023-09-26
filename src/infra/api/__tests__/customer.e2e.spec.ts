import {app, sequelize}  from "../express";
import request from "supertest";
describe("E2E test for customer", () => {

    beforeEach(async ()=> {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name:"Jonh",
                address: {
                    street:"Street",
                    city: "City",
                    number:123,
                    zip:"123456"
                },
            });

            expect(response.status).toBe(200);
            expect(response.body.name).toBe("Jonh")
    });

    it("should not create a customer", async () => {
        const response = await request(app).post("/customer").send({
          name: "john",
        });
        expect(response.status).toBe(500);
      });
})