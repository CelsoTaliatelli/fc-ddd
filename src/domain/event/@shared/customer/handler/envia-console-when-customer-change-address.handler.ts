import EventHandlerInterface from "../../event-handler.interface";
import EventInterface from "../../event.interface";
import CustomerCreatedEvent from "../customer-created.event";
import CustomerChangeAddressEvent from "./customer-change-address.event";

export default class EnviaConsoleWhenCustomerChangeAddressHandler implements EventHandlerInterface<CustomerChangeAddressEvent>{
    handle(event: CustomerChangeAddressEvent): void {
        const address = event.eventData.Address;
        console.log(`Endereço do cliente: 
            ${event.eventData.id}, 
            ${event.eventData.name} 
            alterado para: ${address.street}, ${address.number} - ${address.city} ${address.zip}`
        );
    }
}