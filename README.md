# infinity-api

## Getting It Setup!

```js
const { Client } = require('discord.js');
const client = new Client();
const ibl = require('IBL');

const Poster = ibl.Poster(client, "AuthToken");

Poster.autoPost({
  botID: "ID", // Your botID
  timerLoop: 4629 // This is in MS, this is default to 5 minutes
});

client.login("token");
```
