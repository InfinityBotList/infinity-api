const { Client } = require('./src/main');
const client = null;

const IBL = new Client(client, 'botAuth', {
  webPort: 3001,
  webPath: '/IBLhook',
  webAuth: 'Auth you placed in custom webhooks',
});

const Vote = IBL.voteWebhook(true);


