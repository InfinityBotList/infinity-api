"use strict";

var discord = require('discord.js');

var client = new discord.Client();

var _require = require('ibl-api'),
    IBL = _require.IBL;

var ibl = new IBL(client, 'botAuth');
ibl.postStats(); //Posts stats (retrieved from bot client)

ibl.autopost(60 * 60 * 1000); //Posts every hour

client.login('token');