import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";

let customer = new Customer("123","Celso");
const address = new Address("Rua dois", 2, "12345-789", "SP");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1","Item",25,1,"123");
const item2 = new OrderItem("1","Item",45,1,"456");


const order = new Order("1","123",[item1,item2]);
console.log(order);