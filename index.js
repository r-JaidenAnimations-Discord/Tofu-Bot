// When I started writing this, only God and I understood what I was doing
// Now, only God knows
const Discord = require('discord.js');
const fs = require('fs');
const Tantrum = require('./functions/tantrum.js');
const chalk = require('chalk');
const client = new Discord.Client();
//const { handleError } = require('./functions/errorHandler.js');
const { randomStatus } = require('./functions/statusFunction.js');
const { apiKey } = require('./config.json');

setInterval(function() { randomStatus(client) }, 60 * 30 * 1000);

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./modules/');

// Log in
client.login(apiKey);

//if sh!t goes wrong
client.on('rateLimit', r => {
	console.warn(`${chalk.yellow('[RATELIMIT]')}: ${r}`);
	console.log(r)
})
client.on('warn', w => {
	console.warn(`${chalk.yellow('[Warn]')}: ${w}`);
	//handleError(client, 'index.js', '[WARN]: Unspecified warning', w);
	new Tantrum(client, 'index.js', '[WARN]: Unspecified warning', w);
});
client.on('error', e => {
	console.error(`${chalk.redBright('[ERROR]')}: ${e.stack}`);
	//handleError(client, 'index.js', `[ERROR]: Unspecified error: ${e.stack}`, e);
	new Tantrum(client, 'index.js', `[ERROR]: Unspecified error: ${e.stack}`, e);
});
process.on('uncaughtException', e => console.error(`${chalk.redBright('[Error]')}: ${e.stack}`));
process.on('unhandledRejection', e => console.error(`${chalk.redBright('[Error]')}: ${e.stack}`));
process.on('warning', e => console.warn(`${chalk.yellow('[Error]')}: ${e.stack}`));

// Handlers' modules
['commands', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
