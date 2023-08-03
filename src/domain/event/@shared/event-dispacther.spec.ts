import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event.dispatcher";

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

    })

})