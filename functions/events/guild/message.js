const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
const { prefix } = require('../../config.json');

module.exports = async (client, message) => {

	// Bots shall not trigger me
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	// List up all commands
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Include aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// No DMs
	if (message.channel.type === 'dm') return;

	if (!command) return;

	// All requirements are met, try running the command
	try {
		command.execute(client, message, args);
	} catch (e) {
		//return handleError(client, 'message.js', 'Something went wrong when trying to execute a command', e);
		throw new Tantrum(client, 'message.js', 'Something went wrong when trying to execute a command', e);
		//message.reply('Sooo i like um broke');
	}
}
