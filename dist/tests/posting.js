const discord = require('discord.js');
const client = new discord.Client();
const { IBL } = require('ibl-api');
const ibl = new IBL(client, 'botAuth');
ibl.postStats(); //Posts stats (retrieved from bot client)
ibl.autopost(60 * 60 * 1000); //Posts every hour
client.login('token');
