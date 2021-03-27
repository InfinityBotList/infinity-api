const { EventEmitter } = require('events');
const fetch = require('node-fetch');

// Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

class Client extends EventEmitter {
  constructor(client, token, options = {}) {
    super();
    this.client = client;
    this.token = token;
    this.webAuth = options.webAuth;
    this.api = 'https://api.infinitybotlist.com';
    this.webPath = options.webPath;
    this.webPort = options.webPort;
    
    app.use(bodyParser.json());
    
    this.emit('ready', 'IBL-API Ready!');
    app.listen(this.webPort);
  }

 voteWebhook() {
    app.post(`${this.webPath}`, (req, res) => {
      // Respond to invalid requests
      res.setHeader('X-Powered-By', 'InfinityBotList/Express');
      if (req.header('Authorization') != this.webAuth)
        console.log('Failed Access - InfinityBotList Endpoint');
      if (req.header('Authorization') != this.webAuth)
        return res.status(403).send(
          JSON.stringify({
            error: true,
            message: "[IBL-API] You don't have access to use this endpoint!",
          })
        );

      // Use the data on whatever you want
      console.log(req.body);

      const userID = req.body.userID;
      const botID = req.body.botID;
      const type = req.body.type;

      this.client.emit('vote', userID, botID, type);

      setTimeout(
        () => this.emit('voteExpired', userID, botID),
        1000 * 60 * 60 * 24
      );

      // Respond to IBL API
      res.status(200).send(
        JSON.stringify({
          error: false,
          message: '[IBL-API] Received the request!',
        })
      );
    });
  }

  async autoPost(options = { botID: null, timerLoop: 300000 }, init = true) {
    if (init == false) return;

    // Get Bot Stats
    const serverCount = this.client.guilds.cache.size;
    const shardCount = '0';
    const body = { servers: serverCount, shards: shardCount };

    // Sending Data + Loop
    setInterval(async () => {
      await fetch(`${this.api}/bot/${options.botID}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: this.token,
        },
        body: JSON.stringify(body),
      }).then(async (res) => {
        console.log(await res.json());
      });
      this.client.emit('posted');
    }, options.timerLoop);
  }

  async manualPost(options = {}) {
    const serverCount = options.servers;
    const shardCount = options.shards;
    const bodyM = { servers: serverCount, shards: shardCount };

    // Manual Post To API
    fetch(`${this.api}/bot/${this.botID}`, {
      method: 'post',
      body: JSON.stringify(bodyM),
      headers: {
        'Content-Type': 'application/json',
        authorization: this.token,
      },
    });
  }

}

module.exports = Client;
