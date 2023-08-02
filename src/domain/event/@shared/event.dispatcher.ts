import EventDispatcherInterface from "./event-dispatcher.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface{
    
    notify(event: EventInterface): void {
        throw new Error("Method not implemented.");
    }
    register(eventName: string, eventHandler: EventDispatcherInterface): void {
        throw new Error("Method not implemented.");
    }
    unregister(eventName: string, eventHandler: EventDispatcherInterface): void {
        throw new Error("Method not implemented.");
    }
    unregisterAll(): void {
        throw new Error("Method not implemented.");
    }

}