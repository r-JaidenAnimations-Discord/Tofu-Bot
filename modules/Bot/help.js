const { prefix, tofuOrange } = require('../../config.json');
const Discord = require('discord.js');
const fs = require('fs');
const Tantrum = require('../../functions/tantrum.js');
//const { handleError } = require('../../functions/errorHandler.js');
const { stripIndents } = require('common-tags');

module.exports = {
	name: 'help',
	helpTitle: 'Help',
	category: 'Bot',
	usage: 'help (command)',
	description: 'Stop, get help',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['commands'],
	cooldown: 5,
	execute: async function(client, message, args) {
		//if (message.deletable) message.delete();

		if (args[0]) {
			return getCmd(client, message, args[0]);
		}
		else {
			return getAll(client, message);
		}
	},
};

async function getAll(client, message) {
	const embed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setFooter('Syntax: () = optional, [] = required, {a, b} = choose between a or b');

	const commands = (category) => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => `\`${cmd.name}\``)
			.join(' ');
	};

	const info = client.categories
		.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n\n${commands(cat)}`)
		.reduce((string, category) => string + '\n\n' + category);

	try {
		return message.channel.send(embed.setDescription(info));

	} catch (e) {
		//return handleError(client, 'help.js', 'Error sending help embed', e);
		throw new Tantrum(client, 'help.js', 'Error sending help embed', e);
	}
}

async function getCmd(client, message, input) {
	const embed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setFooter('Syntax: () = optional; [] = required; {a, b} = choose between a or b');

	const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

	if (!cmd) {
		try {
			return message.channel.send(`**${input.toLowerCase()}** is not a command. Are you being delusional?`);
		} catch (e) {
			//return handleError(client, 'help.js', 'Error on sending not a command error.');
			throw new Tantrum(client, 'help.js', 'Error on sending not a command error.');
		}
	}

	// Fetch disabled commands
	const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
	var settingsFile = JSON.parse(data);

	if (cmd.name) embed.setDescription(`**${cmd.helpTitle} command**`);
	if (cmd.aliases) embed.addField('**Aliases**', `${cmd.aliases.map(a => `\`${a}\``).join(' ')}`);
	/*if (cmd.isEnabled)*/ embed.addField('**Status:**', `${settingsFile.disabledCommands.includes(cmd.name) || settingsFile.disabledCommands.includes(cmd.aliases) ? '⚠️ Command has been disabled' : 'Command is currently enabled'}`);
	if (cmd.category) embed.addField('**Category**', cmd.category);
	/*if (cmd.isDMAllowed)*/ embed.addField('**Is allowed trough DM**', `${cmd.isDMAllowed === true ? '\`yes\`' : '\`no\`'}`);
	if (cmd.description) embed.addField('**Command Description**', `${cmd.description}`);
	if (cmd.usage) embed.addField('**Command Structure**', `\`${prefix}${cmd.usage}\``);

	try {
		return message.channel.send(embed);
	} catch (e) {
		throw new Tantrum(client, 'help.js', 'Error on sending command help embed', e);
	}
}
