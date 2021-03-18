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

**AutoPoster:**

```js
const { client } = require('discord.js');
const client = new Client();
const { Client } = require('ibl-api');

const IBL = new Client(client, 'botAuth');

IBL.autoPost({
    botID: '474745745457', // Your botID
    timerLoop: 300000, // This is in MS, this is default to 5 minutes
}, true);

client.login('token');
```

**Vote Webhooks:**

```js
const { Client } = require('ibl-api');
const { client } = require('discord.js');
const client = new Client();

const IBL = new Client(client, 'botAuth', {
  webPort: 3001,
  webPath: '/IBLhook',
  webAuth: 'Auth you placed in custom webhooks',
});
IBL.voteWebhook(true);

IBL.on('ready', () => {
  console.log('Server Ready!');
});

IBL.on('vote', async (userID, botID, type) => {
  console.log(userID + 'Voted For' + botID);
});

client.login('token');
```

# Events

## Posted:

```js
client.on('posted', () => {
  console.log('Posted!');
});
```
