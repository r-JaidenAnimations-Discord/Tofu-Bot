const { prefix, banKirito, banAli } = require('../../config.json');
const fs = require('fs');
const Discord = require('discord.js');
const { noKirito } = require('../../functions/kiritoTrust.js');
const { noAli } = require('../../functions/aliTrust.js');
const { handleError } = require('../../functions/errorHandler.js');

module.exports = (client, message) => {
    let cooldowns = client.cooldowns;
    // nothing get fucked lmao
	// very
	
	if (message.guild === null && !message.author.bot) {
		try {
			return message.channel.send('Can\'t talk right now, I\'m eating tofu');
		} catch (e) {
			return handleError(client, 'message.js', 'Error on sending can\'t talk DM', e);
		}
	}

	// Bots shall not trigger me
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	// List up all commands
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Include aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	if (!command) return;
	
	// Is this command enabled?
	if (command.isEnabled === false) {
		try {
			return message.reply('So uhhhhh. Maxim is really bad at coding and broke this command.\nIt was disabled. So if you could try again later, that would be grrrreat. mkay?');
		} catch (e) {
			return handleError(client, 'message.js', 'Error on sending command disabled message', e);
		}
	}

	// Is this command deprecated?
	if (command.isDeprecated === true) {
		try {
			message.reply('This command has been deprecated and will be removed soon, enjoy it while you can!');
		} catch (e) {
			return handleError(client, 'message.js', 'Error on sending deprecated command message', e);
		}
	}

	if (message.author.id == banKirito) {
		noKirito(client, message, args);
	}

	if (message.author.id == banAli) {
		noAli(client, message, args);
	}

	// No DMs
	if (message.channel.type === 'dm') return;

	// Cooldown?
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			try {
				message.react('⏳');
				message.reply(`It's cool you're trying to do stuff but could you chill a bit for ${timeLeft.toFixed(1)} second(s) before reusing \`${command.name}\`?`);
				return;
			} catch (e) {
				return handleError(client, 'message.js', 'Error on sending command cooldown message', e);
			}
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// All requirements are met, try running the command
	try {
		command.execute(client, message, args);
	} catch (error) {
		return handleError(client, 'message.js', 'Something went wrong when trying to execute a command', e);
		//message.reply('Sooo i like um broke');
	}
}