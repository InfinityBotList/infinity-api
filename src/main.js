const { EventEmitter } = require("events");
const fetch = require('node-fetch');

class Poster extend EventEmitter {
  constructor(client, token) {
    super(options);
    this.client = client;
    this.token = token;
    this.api = ("https://api.infinitybots.xyz");
 }

async autoPost(options={}) {
 if(options.timerLoop =< "300000") return console.log("[IBL] Your Loop Can't Be More Than Every 5 Minutes!");
 it(typeof options.timerLoop !== "number") throw new Error("[IBL] TimerLoop Needs To Be In MS and Numbers!");

 // Set Options
 options.botID = this.botID;
 options.timerLoop = this.loop;

 // Get Bot Stats
 const serverCount = await this.client.guilds.cache.size;
 const shardCount = "0";

 // Sending Data + Loop
 setInterval(() => {
  const data = await fetch(`${this.api}/bot/${this.botID}`, {
        method: 'post',
        body: { 'servers': serverCount, 'shards': shardCount },
        headers: { 'Content-Type': 'application/json', 'authorization': this.token }
   });
   this.client.emit("posted");
  }, this.loop);
 }

async manualPost(options={}) {
 const serverCount = options.servers;
 const shardCount = options.shards;

 // Manual Post To API
 const data = await fetch(`${this.api}/bot/${this.botID}`, {
        method: 'post',
        body: { 'servers': serverCount, 'shards': shardCount },
        headers: { 'Content-Type': 'application/json', 'authorization': this.token }
  });
 }
}

module.exports = Poster;
