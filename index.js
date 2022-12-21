// Note: 
// I implemented the bonus as follows:
//   If an event doesn't have subscribers then it doesn't "waste" memory inide the subscribers array.
//   This is according to the bonus "If an event doesn't have any subscriptions, it does not "waste" any place in the memory."
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.subscribers = [];
    }
    EventEmitter.prototype.subscribe = function (eventName, callback) {
        var subscriber = new Subscriber();
        subscriber.eventEmitter = this; //This is for the unsubscribe()
        subscriber.index = this.subscribers.length;
        subscriber.eventName = eventName;
        subscriber.callback = callback; //This is the callback function which the subscriber should call when user call emit()
        this.subscribers.push(subscriber); //Add this subscriber to the subscribers array
        return subscriber;
    };
    EventEmitter.prototype.emit = function (eventName, eventParams) {
        console.log("In EventEmiter.emit.  event = " + eventName + "   eventParams.key = " + eventParams.key);
        var subscribersForCurrentEvent = this.subscribers.filter(function (subscriber) { return subscriber.eventName == eventName; });
        subscribersForCurrentEvent.forEach(function (subscriber) { subscriber.callback({ key: eventParams.key }); });
    };
    EventEmitter.prototype.unsubscribe = function (subscriberIndex) {
        this.subscribers.splice(subscriberIndex, 1);
    };
    return EventEmitter;
}());
var Subscriber = /** @class */ (function () {
    function Subscriber() {
    }
    Subscriber.prototype.unsubscribe = function () {
        this.eventEmitter.unsubscribe(this.index);
    };
    return Subscriber;
}());
var MyEvent = /** @class */ (function () {
    function MyEvent() {
    }
    return MyEvent;
}());
var EventParams = /** @class */ (function () {
    function EventParams() {
    }
    return EventParams;
}());
function logKeydown(event) {
    console.log('log subscriber: keyboard pressed: ', event.key);
}
function alertKeydown(event) {
    console.log('alert subscriber: keyboard pressed: ' + event.key);
}
console.log("=== Demo of my EventEmitter class ===");
var eventEmitter = new EventEmitter();
console.log("\n>> Subscibing callback functions logkeydown() and alertketdown()");
// Subscribe the methods logkeydown() and alertketdown()
// in EventEmitter for the "keydown" event name.
// EventEmitter will run them when you send to him emit of "keydown" (see below).
var logKeydownSubscription = eventEmitter.subscribe('keydown', logKeydown);
var alertKeydownSubscription = eventEmitter.subscribe('keydown', alertKeydown);
console.log("\n>> Calling emit");
// This runs the subscribed methods logkeydown() and alertketdown()
eventEmitter.emit('keydown', { key: 'Enter' });
console.log("\n>> Unsubscribing alertKeydownSubscription");
alertKeydownSubscription.unsubscribe();
console.log("\n>> Calling emit again");
eventEmitter.emit('keydown', { key: 'Enter' });
