// When I started writing this, only God and I understood what I was doing
// Now, only God knows
const Discord = require('discord.js');
const fs = require('fs');
const { Player } = require('discord-player');
const chalk = require('chalk');
const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.DIRECT_MESSAGES,
		Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_BANS,
		// Discord.Intents.FLAGS.GUILD_EMOJIS,
		// Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
		Discord.Intents.FLAGS.GUILD_INVITES,
		Discord.Intents.FLAGS.GUILD_MEMBERS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		// Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Discord.Intents.FLAGS.GUILD_PRESENCES,
		Discord.Intents.FLAGS.GUILD_VOICE_STATES
	],
	partials: [
		'CHANNEL'
	]
});
const { randomStatus } = require('#utils/statusFunction.js');
const { tagSequelize, movieSuggestionSequelize } = require('./handlers/databases.js');
const { DiscordTogether } = require('discord-together');

setInterval(function() { randomStatus(client) }, 60 * 30 * 1000); // change status every 30 min

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./modules/');
client.player = new Player(client);
client.tags = require('./handlers/dbModels/tags.js')(tagSequelize);
client.movieSuggestions = require('./handlers/dbModels/movieNightSuggestions.js')(movieSuggestionSequelize);
client.interactions = new Discord.Collection();
client.autoResponderCooldowns = new Discord.Collection();
client.groupActivities = new DiscordTogether(client);

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
client.login(client.config.apiKey).catch(e => {
	console.error(`${chalk.redBright('[Error]')}:`, e.stack);
	process.exit(1);
});

//if sh!t goes wrong
if (client.config.devMode) client.on('debug', d => console.log(`${chalk.cyan('[Debug]')}:`, d)); // Debug stuff, only loads when running in debug mode
client.on('rateLimit', r => console.warn(`${chalk.yellow('[Ratelimit]')}:`, r));
client.on('warn', w => console.warn(`${chalk.yellow('[Warn]')}:`, w));
client.on('error', e => console.error(`${chalk.redBright('[Error]')}:`, e.stack));
process.on('uncaughtException', e => console.error(`${chalk.redBright('[Error]')}:`, e.stack));
process.on('unhandledRejection', e => console.error(`${chalk.redBright('[Error]')}:`, e.stack));
process.on('warning', e => console.warn(`${chalk.yellow('[Error]')}:`, e.stack));

// Handlers' modules
['commands', 'event', 'music', 'interaction'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
