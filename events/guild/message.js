const { tofuRed, tofuError } = require('#colors');
const { banKirito, banAli, maxID } = require('#memberIDs');
const Discord = require('discord.js');
const fs = require('fs');
const Tantrum = require('#tantrum');
const { dangerCommandPrompt } = require('#utils/dangerPrompt.js');
const { humanReadableDuration } = require('#utils/buildTimeString.js');

module.exports = async (client, message) => {
	const { prefix, devMode, jaidenServerID, generalChannelID, trustedServers } = client.config;

	let cooldowns = client.cooldowns;
	// nothing get fucked lmao
	// very

	// Pull the list of disabled commands from the settings JSON file. Man this was a pain to get working
	const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
	var settingsFile = JSON.parse(data);
	//console.log(data);
	//console.log(settingsFile);
	//console.log(settingsFile.disabledCommands);

	// Bots shall not trigger me
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	// List up all commands
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Include aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


	// Is this command allowed inside DM? || This code is a piece of crap, but i can't fix it
	if (message.guild === null && !message.author.bot) {
		if (command.isDMAllowed === false && message.channel.type === 'dm') {
			try {
				return message.channel.send('Can\'t talk right now, I\'m eating tofu');
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending can\'t talk DM', e);
			}
		}
		if (!command) {
			try {
				return message.channel.send('Can\'t talk right now, I\'m eating tofu');
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending can\'t talk DM', e);
			}
		}
	}

	if (!command) return;

	// Is this command deprecated?
	if (command.isDeprecated === true) {
		try {
			message.reply('This command has been deprecated and will be removed soon, enjoy it while you can!');
		} catch (e) {
			throw new Tantrum(client, 'message.js', 'Error on sending deprecated command message', e);
		}
	}

	// Kirito trust
	if (message.author.id === banKirito) {
		if (settingsFile.kiritoTrust === false) {
			try {
				return message.reply('You know, I really don\'t trust you, like at all. So stop messaging me!', { files: ['./commanddata/banKirito.png'] });
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending nokirito message', e);
			}
		}
	}

	// Ali trust
	if (message.author.id === banAli) {
		if (settingsFile.aliTrust === false) {
			try {
				return message.reply('Your very existence causes me intense pain with how unfunny you are.\nNever send a message again.\nNever even fucking conceive a thought again.', { files: ['./commanddata/infinitecringe.png'] });
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending nocringe message', e);
			}
		}
	}

	if (settingsFile.blackListing === true) {
		// Member Blacklisting
		const blackListRawData = await fs.readFileSync('./deployData/blacklist.json', 'utf-8');
		var blackListData = JSON.parse(blackListRawData);

		//console.log(blackListData)
		//console.log(blackListData.python)
		//console.log(blackListData.wrongchannel)
		//console.log(blackListData.other)

		if (blackListData.python.includes(message.author.id)) {
			//pyhon
			//console.log('PYTHON TRIGGERED');
			try {
				return message.channel.send('Come back when you stop using Python');
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending python blacklist message', e);
			}
		}
		else if (blackListData.bamboozle.includes(message.author.id)) {
			//spam
			//console.log('SPAMSPMAPMSPAMPSMPAMSPMSAPM')
			try {
				return message.channel.send('Ahahahahahahah get f\'ed you foul piece of $h!t', { files: ['./commanddata/lemao.png'] });
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending bamboozle blacklist message', e);
			}
		}
		else if (blackListData.hate.includes(message.author.id)) {
			//hate
			//console.log('HATE ON ME')
			try {
				return message.channel.send('I hate you too');
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending hate blacklist message', e);
			}
		}
		else if (blackListData.wrongchannel.includes(message.author.id)) {
			//wrongchannel
			//console.log('WRONGCHANNEL TRIGGERED');
			try {
				return message.channel.send('Come back when you learn to use commands in the right place');
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending wrongchannel blacklist message', e);
			}
		}
		else if (blackListData.bloop.includes(message.author.id)) {
			try {
				return message.channel.send('Haha, queen mush', { files: ['./commanddata/lemao.png'] });
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending bloop blacklist message', e);
			}
		}
		else if (blackListData.other.includes(message.author.id)) {
			//other
			//console.log('OTHER TRIGGERED');
			try {
				return message.channel.send('Nope, not listening to you');
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending other blacklist message', e);
			}
		}
	}

	// No DMs
	//if (message.channel.type === 'dm') return;

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
			try {
				await message.react('⏳');
				message.reply(`It's cool you're trying to do stuff but could you chill a bit for ${/*timeLeft.toFixed(1)*/humanReadableDuration(expirationTime - now)} before reusing \`${command.name}\`?`);
				return;
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending command cooldown message', e);
			}
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	if (message.guild) {
		// Check if bot is used in unauthorized server
		if (!trustedServers.includes(message.guild.id)) {
			try {
				client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`THIS IS BAD: Tofu has been used in an untrusted server!\nServer id: ${message.guild.id}`).setColor(tofuError));
				message.channel.send('This is a proprietary bot for the r/JaidenAnimations server. Please remove it from your server.');
				return;
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending untrusted server message', e);
			}
		}

		// Warn when a command is executed from the devserver to the main deploy
		if (message.guild.id !== jaidenServerID && devMode === false && command.isDangerous === true && await dangerCommandPrompt(message) === false) return;
	}

	// Is this command enabled?
	if (settingsFile.disabledCommands.includes(command.name)) {
		try {
			return message.channel.send(`Hi ${message.author.username}, whaaats happening.\nWe have sort of a problem here, yeah apparently max broke this command and had to disable it.\nSo if you could try again later, that would be grrrreat. mkay?`, { files: ['./commanddata/Configuration/commandDisabled.gif'] });
		} catch (e) {
			throw new Tantrum(client, 'message.js', 'Something went wrong when sending the command disabled message.', e);
		}
	}

	// All requirements are met, try running the command
	try {
		command.execute(client, message, args);
	} catch (e) {
		throw new Tantrum(client, 'message.js', 'Something went wrong when trying to execute a command', e);
		//message.reply('Sooo i like um broke');
	}
}
