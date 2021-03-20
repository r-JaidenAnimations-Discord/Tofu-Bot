const { prefix, banKirito, banAli, tofuRed, tofuError, maxID, devMode, jaidenServerID, trustedServers } = require('../../config.json');
const fs = require('fs');
const Discord = require('discord.js');
//const { noKirito } = require('../../functions/kiritoTrust.js');
//const { noAli } = require('../../functions/aliTrust.js');
const { handleError } = require('../../functions/errorHandler.js');
//const { disabledCommands } = require('../../commanddata/Configuration/settings.json');
//var settingsFile = JSON.parse(fs.readFileSync('./commanddata/Configuration/settings.json', 'utf-8'));
//var disabledCommands = settingsFile.disabledCommands
const { promptMessage } = require('../../functions/promptMessage.js');

module.exports = async (client, message) => {
	let cooldowns = client.cooldowns;
	// nothing get fucked lmao
	// very


	// Pull the list of disabled commands from the settings JSON file. Man this was a pain to get working
	const data = await fs.readFileSync('./commanddata/Configuration/settings.json', 'utf-8');
	var settingsFile = JSON.parse(data);
	console.log(data);
	console.log(settingsFile);
	console.log(settingsFile.disabledCommands);

	// Respond on bot ping
    if (message.mentions.has(client.user.id)) {
		if (message.content.includes('@here') || message.content.includes('@everyone')) return;
		try {
			message.channel.send('Can you not? ;_;');
		} catch(e) {
			return handleError(client, 'message.js', 'Error on sending mad ping', e);
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
	/*if (command.isEnabled === false) {
		try {
			return message.reply('So uhhhhh. Maxim is really bad at coding and broke this command.\nIt was disabled. So if you could try again later, that would be grrrreat. mkay?');
		} catch (e) {
			return handleError(client, 'message.js', 'Error on sending command disabled message', e);
		}
	}*/

	// Is this command allowed inside DM?
	if (command.isDMAllowed && message.channel.type === 'dm') {
		if (message.guild === null && !message.author.bot) {
			try {
				return message.channel.send('Can\'t talk right now, I\'m eating tofu');
			} catch (e) {
				return handleError(client, 'message.js', 'Error on sending can\'t talk DM', e);
			}
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
		if (settingsFile.kiritoTrust === false) {
			try {
				return message.channel.reply('You know, I really don\'t trust you, like at all. So stop messaging me!', { files: ["./commanddata/banKirito.png"] });
			} catch (e) {
				return handleError(client, 'message.js', 'Error on sending nokirito message', e);
			}
		}
	}

	if (message.author.id == banAli) {
		if (settingsFile.aliTrust === false) {
			try {
				return message.channel.reply('Your very existence causes me intense pain with how unfunny you are.\nNever send a message again.\nNever even fucking conceive a thought again.', { files: ["./commanddata/infinitecringe.png"] });
			} catch (e) {
				return handleError(client, 'message.js', 'Error on sending nocringe message', e);
			}
		}
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

	if (!trustedServers.includes(message.guild.id)) {
		try {
			message.channel.send('This is a proprietary bot for the r/JaidenAnimations server. Please remove it from your server.');
			client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`THIS IS BAD: Tofu has been used in an untrusted server!\nServer id: ${message.guild.id}`).setColor(tofuError));
			return;
		} catch(e) {
			return handleError(client, 'message.js', 'Error on sending untrusted server message', e);
		}	
	}

	// Warn when a command is executed from the devserver to the main deploy
	if (message.guild.id !== jaidenServerID && devMode === false) {
		
		const warnEmbed = new Discord.MessageEmbed()
			.setColor(tofuRed)
			.setAuthor(message.author.tag, message.member.user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true }))
			.setTitle('HOLD UP')
			.setDescription('You are about to execute a command that could affect the bot in the main server. Are you absolutely sure you want to do this?')
			.setTimestamp();

		return message.channel.send(warnEmbed).then(async msg => {
		const emoji = await promptMessage(msg, message.author, 30, ['✅', '❌']);

		if (emoji === '✅') {
			msg.delete();
			message.channel.send('Done, you were warned');
				if (disabledCommands.includes(command.name)) {
				try{ 
					return message.channel.send('So uhhhhh. Maxim is really bad at coding and broke this command.\nIt was disabled. So if you could try again later, that would be grrrreat. mkay?', { files: ['./commanddata/Configuration/commandDisabled.gif']});
				} catch(e) {
					return handleError(client, 'message.js', 'Something went wrong when sending the command disabled message.', e);
				}
			}

			// All requirements are met, try running the command
			try {
				command.execute(client, message, args);
			} catch (error) {
				return handleError(client, 'message.js', 'Something went wrong when trying to execute a command', e);
			}
			
		} else if (emoji === '❌') {
			msg.delete();
			message.channel.send('Okay');
		}
		});
	}

	if (settingsFile.disabledCommands.includes(command.name)) {
		try{ 
			return message.channel.send('So uhhhhh. Maxim is really bad at coding and broke this command.\nIt was disabled. So if you could try again later, that would be grrrreat. mkay?', { files: ['./commanddata/Configuration/commandDisabled.gif']});
		} catch(e) {
			return handleError(client, 'message.js', 'Something went wrong when sending the command disabled message.', e);
		}
	}
	
	// All requirements are met, try running the command
	try {
		command.execute(client, message, args);
	} catch (error) {
		return handleError(client, 'message.js', 'Something went wrong when trying to execute a command', e);
		//message.reply('Sooo i like um broke');
	}
}