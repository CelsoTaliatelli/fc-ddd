import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./order.repository";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import { OrderStatus } from "../../../../domain/checkout/value-object/order-status.enum";
import Customer from "../../../../domain/customer/entity/customer";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id
        );

        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            status: order.status,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });

    it("Should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("456", "Customer 2");
        const address = new Address("Street 2", 1, "Zipcode 2", "City 2");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("456", "Product 2", 15);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            1,
            product.id
        );

        const order = new Order("456", "456", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "456",
            customer_id: "456",
            total: order.total(),
            status: OrderStatus.PENDING,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "456",
                    product_id: "456",
                },
            ],
        });

        order.updateStatus(OrderStatus.APROVED);
        
        await orderRepository.update(order);

        const orderModel2 = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel2.toJSON()).toStrictEqual({
            id: "456",
            customer_id: "456",
            total: order.total(),
            status:OrderStatus.APROVED,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "456",
                    product_id: "456",
                },
            ],
        });

    });

    it("should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        const product2 = new Product("456", "Product 2", 10);
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id
        );
        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            2,
            product2.id
        );
        const order = new Order("123", "123", [orderItem,orderItem2]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        const foundOrder = await orderRepository.find("123")

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerId,
            total: foundOrder.total(),
            status: foundOrder.status,
            items: foundOrder.items.map((orderItem:OrderItem) => {
                return {
                    "id": orderItem.id,
                    "name": orderItem.name,
                    "price": orderItem.price,
                    "quantity": orderItem.quantity,
                    "order_id": foundOrder.id,
                    "product_id": orderItem.productId,
                }
            })
        });
    });
    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        const product2 = new Product("456", "Product 2", 10);
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id
        );
        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            2,
            product2.id
        );
        const order = new Order("123", "123", [orderItem]);
        const order2 = new Order("456","123", [orderItem2]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        await orderRepository.create(order2);
        const foundOrders = await orderRepository.findAll();
        const orders = [order,order2];
        expect(orders).toEqual(foundOrders);

       
    });
});