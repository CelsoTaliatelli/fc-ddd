import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    
    it('should calculate total', () => {
        let OrderItem1 = new OrderItem("1","Product 1",15,1,"123");
        let OrderItem2 = new OrderItem("1","Product 2",30,2,"456");
        let order = new Order("1","123",[OrderItem1,OrderItem2]);
        expect(order.total()).toBe(75);
    });
})