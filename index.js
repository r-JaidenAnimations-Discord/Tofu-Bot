// When I started writing this, only God and I understood what I was doing
// Now, only God knows
const Discord = require('discord.js');
const fs = require('fs');
const { Player } = require('discord-player');
const Tantrum = require('#tantrum');
const chalk = require('chalk');
const client = new Discord.Client();
const { randomStatus } = require('#utils/statusFunction.js');
const { remindShrimp } = require('#utils/shrimpReminder.js');
const { tagSequelize, movieSuggestionSequelize } = require('./handlers/databases.js');

setInterval(function() { randomStatus(client) }, 60 * 30 * 1000); // change status every 30 min
setInterval(function() { remindShrimp(client) }, 60 * 60 * 1000); // remind Shrimp hourly

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./modules/');
client.player = new Player(client, {
	leaveOnEndCooldown: 300000,
	leaveOnStopCooldown: 300000,
	leaveOnEmptyCooldown: 200000,
	autoSelfDeaf: true,
	fetchBeforeQueued: false, // Default value is false | Property to have all spotify songs fetched before playing. Put in here because i want to experiment with it.
	enableLive: true
});
client.tags = require('./handlers/dbModels/tags.js')(tagSequelize);
client.movieSuggestions = require('./handlers/dbModels/movieNightSuggestions.js')(movieSuggestionSequelize);

// Config loading
let launchArgs = process.argv.slice(2);
switch (launchArgs[0]) {
	case 'debug':
		console.log(`${chalk.magenta('[Config]')}: Debug configuration will be loaded.`);
		client.config = require('./configDebug.json');
		break;
	case 'release':
		console.log(`${chalk.magenta('[Config]')}: Release configuration will be loaded.`);
		client.config = require('./configRelease.json');
		break;
	default:
		console.log(`${chalk.magenta('[Config]')}: ${chalk.yellow('No arguments provided, Release configuration will be loaded.')}`);
		client.config = require('./configRelease.json');
		break;
}

// Log in
client.login(client.config.apiKey);

//if sh!t goes wrong
/*client.on('rateLimit', r => {
	console.warn(`${chalk.yellow('[RATELIMIT]')}: ${r}`);
	console.log(r);
});*/
client.on('warn', w => {
	console.warn(`${chalk.yellow('[Warn]')}: ${w}`);
	new Tantrum(client, 'index.js', '[WARN]: Unspecified warning', w);
});
client.on('error', e => {
	console.error(`${chalk.redBright('[ERROR]')}: ${e.stack}`);
	new Tantrum(client, 'index.js', `[ERROR]: Unspecified error: ${e.stack}`, e);
});
process.on('uncaughtException', e => console.error(`${chalk.redBright('[Error]')}: ${e.stack}`));
process.on('unhandledRejection', e => console.error(`${chalk.redBright('[Error]')}: ${e.stack}`));
process.on('warning', e => console.warn(`${chalk.yellow('[Error]')}: ${e.stack}`));

// Handlers' modules
['commands', 'event', 'music'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
