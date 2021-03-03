# infinity-api

# Table Of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Events](#events)


# Installation

## NPM
```js
npm install --save ibl
```

## Yarn
```js
yarn install ibl
```

# Usage

```js
const { Client } = require('discord.js');
const client = new Client();
const ibl = require('IBL');

const Poster = ibl.Poster(client, "AuthToken");

Poster.autoPost({
  botID: "474745745457", // Your botID
  timerLoop: 4629 // This is in MS, this is default to 5 minutes
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
