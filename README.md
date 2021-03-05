# infinity-api

# Table Of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Events](#events)


# Installation

## NPM
```js
npm install --save ibl-api
```

## Yarn
```js
yarn install ibl-api
```

# Usage

```js
const { Client } = require('discord.js');
const client = new Client();
const ibl = require('IBL-api');

const Poster = new ibl.Poster(client, "AuthToken");

Poster.autoPost({
  botID: "474745745457", // Your botID
  timerLoop: 300000 // This is in MS, this is default to 5 minutes
}, true);

client.login("token");
```

# Events

## Posted:

```js
client.on("posted", () => {
  console.log("Posted!");
});
```
