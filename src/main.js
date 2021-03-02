const { EventEmitter } = require("events");

class Poster extend EventEmitter {
  constructor(client, token) {
    super(options);
    this.client = client;
    this.token = token;
    this.api = ("https://api.infinitybots.xyz/");
 }

async autoPost(options={}) {
 if(options.timerLoop =< "300000") return console.log("[IBL] Your Loop Can't Be More Than Every 5 Minutes!");
 it(typeof options.timerLoop !== "number") throw new Error("[IBL] TimerLoop Needs To Be In MS and Numbers!");

 // Set Options
 options.botID = this.botID;
 options.timerLoop = this.loop;
 }
}
module.exports = Poster;
