const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'help',
	helpTitle: 'Help',
	category: 'Bot',
	usage: 'help (command)',
	description: 'Stop, get help',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['ncommands'],
	cooldown: 0,
	execute: async (client, message, args) => {
		if (args[0]) {
			return getCmd(client, message, args[0]);
		} else {
			return getAll(client, message);
		}
	}
};

function getAll(client, message) {
	const { jaidenServerID, tofuBotServerID } = client.config;

	const embed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setFooter('Syntax: () = optional, [] = required, {a, b} = choose between a or b');

	/* client.categories is an array
	Basically, this reads recursively each directory from ./modules
	Then, for each category, it adds a field to the embed with the name and its commands */
	client.categories.forEach(category => {
		let commands = client.commands.filter(cmd => cmd.category == category && !cmd.isHidden);

		// If this is not the main server, and the command is for the main server only, we remove those commands from the help list
		if (![jaidenServerID, tofuBotServerID].includes(message.guild.id)) commands = commands.filter(cmd => cmd.category == category && !cmd.mainServerOnly);
		embed.addField(category, commands
			.map(str => `\`${str.name}\``) // Formats the names to include monospace
			.join(' ')); // Joints them by spaces instead of newlines
	});

	// After they're all added, send it
	return message.channel.send({ embeds: [embed] }).catch(e => {
		throw new Tantrum(client, 'help.js', 'Error sending help embed', e);
	});
}

function getCmd(client, message, input) {
	const { prefix, jaidenServerID, tofuBotServerID } = client.config;

	const embed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setFooter('Syntax: () = optional; [] = required; {a, b} = choose between a or b');

	// Fetching the command data through client.commands or client.aliases
	const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

	// If this is not the main server, and the command is for the main server only, we stop here
	if (cmd.mainServerOnly && ![jaidenServerID, tofuBotServerID].includes(message.guild.id)) return message.channel.send('So that command is not for this server').catch(e => {
		throw new Tantrum(client, 'help.js', 'Error on sending not for this server message', e);
	});

	// If the command isn't found (likely doesn't exist)
	if (!cmd) return message.channel.send(`**${input.toLowerCase()}** is not a command. Are you being delusional?`).catch(e => {
		throw new Tantrum(client, 'help.js', 'Error on sending not a command error.', e);
	});

	// Adds its name based on helpName || uppercase name
	if (cmd.name) embed.setDescription(`**${cmd.helpName ? cmd.helpName : cmd.name[0].toUpperCase() + cmd.name.slice(1)} Command**`);
	// Adds aliases by mapping them
	if (cmd.aliases) embed.addField('**Aliases**', `${cmd.aliases.map(a => `\`${a}\``).join(' ')}`);
	// The description
	if (cmd.description) embed.addField('**Description**', `${cmd.description}`);
	// The usage
	if (cmd.usage) embed.addField('**Usage**', `\`${prefix}${cmd.usage}\``);

	return message.channel.send({ embeds: [embed] }).catch(e => {
		throw new Tantrum(client, 'help.js', 'Error on sending command help embed', e);
	});
}
