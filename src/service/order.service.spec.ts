import Order from "../domain/entity/order";
import OrderItem from "../domain/entity/order_item";
import OrderService from "./order.service";

describe('OrderService unit test', () => {

    it('Should get total of all orders', () => {
        const item1 = new OrderItem("1","item 1",100,1,"p1");
        const item2 = new OrderItem("2","item 2",200,2,"p2");

        const order = new Order("o1","c1",[item1]);
        const order2 = new Order("o2","c2",[item2]);

        const total = OrderService.total([order,order2]);

        expect(total).toBe(500);
    })

})