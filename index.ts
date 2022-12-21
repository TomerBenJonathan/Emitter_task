

class EventEmitter {

    private subscribers : Subscriber[] = [];

    constructor() {
    }

    public subscribe(eventName: string, callback: (event: MyEvent) => void ) : Subscriber {
        let subscriber : Subscriber = new Subscriber();
        subscriber.eventEmitter = this;  
        subscriber.index = this.subscribers.length;
        subscriber.eventName = eventName;
        subscriber.callback = callback;  
        this.subscribers.push(subscriber); 
        return subscriber;
    }

    public emit(eventName: string, eventParams: EventParams) : void {
        console.log("In EventEmiter.emit.  event = " + eventName + "   eventParams.key = " + eventParams.key);
        let subscribersForCurrentEvent = this.subscribers.filter(subscriber=>subscriber.eventName==eventName);
        subscribersForCurrentEvent.forEach(subscriber=>{subscriber.callback({key: eventParams.key})});
    }

    public unsubscribe(subscriberIndex: number) : void
    {
        this.subscribers.splice(subscriberIndex,1);
    }
}

class Subscriber {
    public eventEmitter: EventEmitter;
    public index: number;
    public eventName : string;
    public callback: (event: MyEvent) => void;
    
    public unsubscribe() : void {
        this.eventEmitter.unsubscribe(this.index);
    }
}

class MyEvent {
    public key : string;
}

class EventParams {
    public key : string;
}


function logKeydown(event: MyEvent) : void {
    console.log('log subscriber: keyboard pressed: ', event.key);
}

function alertKeydown(event: MyEvent) : void {
    console.log('alert subscriber: keyboard pressed: ' + event.key);
}


console.log("=== Demo of my EventEmitter class ===");

let eventEmitter : EventEmitter = new EventEmitter();


console.log("\n>> Subscibing callback functions logkeydown() and alertketdown()")


const logKeydownSubscription : Subscriber = eventEmitter.subscribe('keydown', logKeydown);
const alertKeydownSubscription : Subscriber = eventEmitter.subscribe('keydown', alertKeydown);

console.log("\n>> Calling emit")


eventEmitter.emit('keydown', {key: 'Enter'});

console.log("\n>> Unsubscribing alertKeydownSubscription" );
alertKeydownSubscription.unsubscribe();

console.log("\n>> Calling emit again")
eventEmitter.emit('keydown', {key: 'Enter'});


