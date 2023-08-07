import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EventDispatcher from "./event.dispatcher";
import EnviaConsoleWhenCustomerIsCreatedHandler from "../../customer/event/handler/envia-console-when-customer-is-created.handler";
import EnviaConsole2WhenCustomerIsCreatedHandler from "../../customer/event/handler/envia-console2-when-customer-is-created.handler";
import EnviaConsoleWhenCustomerChangeAddressHandler from "../../customer/event/handler/envia-console-when-customer-change-address.handler";
import CustomerChangeAddressEvent from "../../customer/event/handler/customer-change-address.event";
import Customer from "../../customer/entity/customer";

describe("Domain event tests", () => {
    it("Should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("Should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();

        eventDispatcher.unregister("ProductCreatedEvent",eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    })

    it("Should unregister all event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBe(undefined);
    });

    it("Should notify all event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler,"handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description:  "Product 1 description",
            price: 10.0
        });

        //Quando o notify for executado o sendMAilWhenPRoductIsCreteadHandler deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    });

    it("Should notify all event handler (Customer)", () => {
        const eventDispatcher = new EventDispatcher();
        
        const eventHandler = new EnviaConsoleWhenCustomerIsCreatedHandler();
        const eventHandler2 = new EnviaConsole2WhenCustomerIsCreatedHandler();
        const spyEventDispatcher = jest.spyOn(eventHandler,"handle");
        const spyEventDispatcher2 = jest.spyOn(eventHandler2,"handle");
        

        eventDispatcher.register("CustomerCreatedEvent",eventHandler);
        eventDispatcher.register("CustomerCreatedEvent",eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);


        const customer = new Customer("123","Customer 1");
        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        console.log(eventDispatcher.getEventHandlers);

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventDispatcher).toHaveBeenCalled();
        expect(spyEventDispatcher2).toHaveBeenCalled();


    })

    it("Should notify a event handler Customer changeAddress", () => {
        const eventDispatcher = new EventDispatcher();
        
        const eventHandler = new EnviaConsoleWhenCustomerChangeAddressHandler();
        const spyEventDispatcher = jest.spyOn(eventHandler,"handle");
        

        eventDispatcher.register("CustomerChangeAddressEvent",eventHandler);;

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();


        const customer = new Customer("123","Customer 1");
        const customerAddress = new Address("Rua 1", 123,"123456987","City 1");
        customer.changeAddress(customerAddress);
        const customerAddressEvent = new CustomerChangeAddressEvent(customer);

        console.log(eventDispatcher.getEventHandlers);

        eventDispatcher.notify(customerAddressEvent);

        expect(spyEventDispatcher).toHaveBeenCalled();


    })

})