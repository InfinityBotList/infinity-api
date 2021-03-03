const { Client } = require('discord.js');
const client = new Client();
const ibl = require('./index.js');

const Poster = new ibl.Poster(client, "HqXXC0FYe78x69KCEhLlYrOoGd6ktytBrokQifDlp0CiJs3AbfeXWJBbeJYOnxbiyPa31DLYYb4gAAxsXw4vba6omPDD6cz9xnFX");

Poster.autoPost({
  botID: "765088908773818378", // Your botID
  timerLoop: 300000 // This is in MS, this is default to 5 minutes
}, true);

client.login("NzcxNDgzNzQxOTc3NzA2NTI2.X5syOQ.cdMtgu8cD3E02jpj4FfD7aQ48dM");