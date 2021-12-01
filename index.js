// When I started writing this, only God and I understood what I was doing
// Now, only God knows
const Discord = require('discord.js');
const fs = require('fs');
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
const { tagSequelize, movieSuggestionSequelize, birthdaySequelize } = require('./handlers/databases.js');
const { DiscordTogether } = require('discord-together');
const { Node } = require('lavaclient');
const { load } = require('@lavaclient/spotify');
const Tantrum = require('./utils/tantrum.js');

setInterval(function() { randomStatus(client) }, 60 * 30 * 1000); // change status every 30 min

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./modules/', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
client.tags = require('./handlers/dbModels/tags.js')(tagSequelize);
client.movieSuggestions = require('./handlers/dbModels/movieNightSuggestions.js')(movieSuggestionSequelize);
client.birthdays = require('./handlers/dbModels/birthdays.js')(birthdaySequelize);
client.interactions = new Discord.Collection();
client.autoResponderCooldowns = new Discord.Collection();
client.groupActivities = new DiscordTogether(client);


// Config loading
const launchArgs = process.argv.slice(2);
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
		console.log(`${chalk.magenta('[Config]')}: ${chalk.yellow('No arguments provided, Debug configuration will be loaded.')}`);
		client.config = require('./configDebug.json');
		break;
}

require('@lavaclient/queue/register');
load({
	client: {
		id: client.config.spotifyClientID,
		secret: client.config.spotifyToken,
	},
	autoResolveYoutubeTracks: false,
});

client.music = new Node({
	sendGatewayPayload: (id, payload) => client.guilds.cache.get(id)?.shard?.send(payload),
	connection: {
		host: 'localhost',
		port: 2333,
		password: 'youshallnotpass'
	}
});
client.queues = new Discord.Collection();

client.ws.on('VOICE_SERVER_UPDATE', data => client.music.handleVoiceUpdate(data));
client.ws.on('VOICE_STATE_UPDATE', data => client.music.handleVoiceUpdate(data));

// Log in
client.login(client.config.apiKey);

// if sh!t goes wrong
// if (client.config.devMode) client.on('debug', d => console.log(`${chalk.cyan('[Debug]')}:`, d)); // Debug stuff, only loads when running in debug mode
client.on('rateLimit', r => console.warn(`${chalk.yellow('[Ratelimit]')}:`, r));
client.on('warn', w => console.warn(`${chalk.yellow('[Warn]')}:`, w));
client.on('error', e => new Tantrum(client, e));
process.on('uncaughtException', e => new Tantrum(client, e));
process.on('unhandledRejection', e => new Tantrum(client, e));
process.on('warning', e => console.warn(`${chalk.yellow('[Error]')}:`, e.stack));

// Handlers' modules
['commands', 'event', 'lava', 'interaction'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

// Custom prototypes
require('./handlers/prototypes.js');
