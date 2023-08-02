import EventInterface from "./event.interface";

export default interface EventDispatcherInterface{
    
    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventDispatcherInterface): void;
    unregister(eventName: string, eventHandler: EventDispatcherInterface): void;
    unregisterAll(): void;

}