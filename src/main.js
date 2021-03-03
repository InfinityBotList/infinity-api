const { EventEmitter } = require("events");
const fetch = require('node-fetch');

class Poster extends EventEmitter {
  constructor(client, token) {
    super();
    this.client = client;
    this.token = token;
    this.api = ("https://api.infinitybots.xyz");
 }

async autoPost(options={  botID: null, timerLoop: 1.2e+6 }, init=true) {
  if (init == false) return;

 // Get Bot Stats
 const serverCount = "500";
 const shardCount = "0";
 const body = { 'servers': serverCount, 'shards': shardCount };
  
 // Sending Data + Loop
 setInterval(() => {
  fetch(`${this.api}/bot/${options.botID}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'authorization': this.token },
        body: JSON.stringify(body)
   }).then(async res => {console.log(await res.json())})
   this.client.emit("posted");
  }, options.timerLoop);
}

  async manualPost(options={}) {
 const serverCount = options.servers;
 const shardCount = options.shards;

 // Manual Post To API
 const data = fetch(`${this.api}/bot/${this.botID}`, {
        method: 'post',
        body: { 'servers': serverCount, 'shards': shardCount },
        headers: { 'Content-Type': 'application/json', 'authorization': this.token }
  });
 }
}

module.exports = Poster;
