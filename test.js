const { Client } = require('discord.js');
const client = new Client();
const ibl = require('src/index.js');

const Poster = ibl.Poster(client, "HqXXC0FYe78x69KCEhLlYrOoGd6ktytBrokQifDlp0CiJs3AbfeXWJBbeJYOnxbiyPa31DLYYb4gAAxsXw4vba6omPDD6cz9xnFX");

Poster.autoPost({
  botID: "474745745457", // Your botID
  timerLoop: 4629 // This is in MS, this is default to 5 minutes
}, true);

client.login("token");