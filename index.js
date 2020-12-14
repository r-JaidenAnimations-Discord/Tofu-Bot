// When I started writing this, only God and I understood what I was doing
// Now, only God knows
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { apiKey } = require('./config.json');
const { randomStatus } = require('./functions/statusFunction.js');

setInterval(function() { randomStatus(client) }, 60 * 30 * 1000);

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./modules/');

// Log in
client.login(apiKey);

// Handlers' modules
['commands', 'event'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});