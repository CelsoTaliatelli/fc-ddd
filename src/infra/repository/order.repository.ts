import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";


export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                status: entity.status,
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }
    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                status: entity.status,
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                where: {
                    id: entity.id,
                },
            },
        )
    }
    async find(id: string): Promise<Order> {
        const entity = await OrderModel.findOne({
            where: { id: id },
            include: ["items"],
        });
        return new Order(
                entity.id,
                entity.customer_id,
                entity.items.map((item) => {
                   return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.quantity,
                    item.product_id,
                    );
                })
            );
    }
    async findAll(): Promise<Order[]> {
        const entity = await OrderModel.findAll({include:[OrderItemModel]});
    
        return entity.map((entity) => {
            return new Order(
                entity.id,
                entity.customer_id,
                entity.items.map((item) => {
                   return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.quantity,
                    item.product_id,
                    );
                })
            );
        })
    }
}