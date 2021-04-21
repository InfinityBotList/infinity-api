# infinity-api 

# Table Of Contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

## NPM

```js
npm install --save ibl-api
```

## Yarn

```js
yarn install ibl-api
```

# Usage:

## Posting:
```js
const discord = require('discord.js');
const client = new discord.Client();
const { IBL } = require('ibl-api');

const ibl = new IBL(client, 'botAuth');

ibl.postStats() //Posts stats (retrieved from bot client)
ibl.autopost(60 * 60 * 1000) //Posts every hour

client.login('token');
```

## Vote Webhooks:
```js
const { IBL } = require('ibl-api');
const discord = require('discord.js');
const client = new discord.Client();

const ibl = new IBL(client, 'botAuth');
ibl.voteWebhook(
    'web auth', //web auth set on bot page
    3001, //port
    '/ibl/webhook' //path to post to, set on bot page
)

ibl.webhook.on("ready", port => {
    console.log(`Infinity Bot List webhook is listening on ${port}`)
});

ibl.webhook.on("vote", async (user, bot, type) => {
  console.log(`${user} voted for ${bot}`);
});

client.login('token');
```

# All Code Owned By: The InfinityBotList Team
