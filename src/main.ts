import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123","Celso");
const address = new Address("Rua dois", 2, "12345-789", "SP");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1","Item",25);
const item2 = new OrderItem("1","Item",45);


const order = new Order("1","123",[item1,item2]);
console.log(order);