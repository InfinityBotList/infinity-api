const { EventEmitter } = require("events");

class Webhooks extends EventEmitter {
    constructor(client) {
        super();
        this.client = client;
    }   
}

module.exports = Webhooks;