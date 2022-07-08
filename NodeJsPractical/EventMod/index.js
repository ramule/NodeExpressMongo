/* EventEmitter class is defined */
const EventEmitter = require('events');

/* Instance is created for EventEmitter class */
const event = new EventEmitter();

/* multiple functions on same event emit */
event.on("sayHello", () => {
    console.log("Hello Events1");
});

event.on("sayHello", () => {
    console.log("Hello Events2");
});

event.on("sayHello", () => {
    console.log("Hello Events3");
});

event.emit("sayHello");

/* Events with passing parameters */
event.on("sayCallParamEvents", (statusCode, msg) => {
    console.log("Status code is "+ statusCode + " and Message is "+ msg);
});

event.emit("sayCallParamEvents", 200, "ok");
