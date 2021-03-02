const { EventEmitter } = require("events");

class Poster extend EventEmitter {
  constructor(client, token, options={}) {
    super(options);
    this.client = client;
 }



}
module.exports = Poster;
