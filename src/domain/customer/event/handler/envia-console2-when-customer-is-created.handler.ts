import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsole2WhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
   
    handle(event: CustomerCreatedEvent): void {
        console.log(`Esse é o 2 console.log do evento: CustomerCreated`);
    }

}