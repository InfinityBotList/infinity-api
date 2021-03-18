const discord = require('discord.js');
const client = new discord.Client();
const { Client } = require('./index.js');

const IBL = new Client(client, 'botAuth');

IBL.autoPost({
    botID: '474745745457', // Your botID
    timerLoop: 300000, // This is in MS, this is default to 5 minutes
}, true);

client.login('token');