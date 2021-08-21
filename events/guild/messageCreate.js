const { tofuRed, tofuError } = require('#colors');
const { banKirito, banAli, maxID } = require('#memberIDs');
const Discord = require('discord.js');
const fs = require('fs-extra');
const Tantrum = require('#tantrum');
const { autoResponders } = require('../../handlers/autoResponder.js');
const { dangerCommandPrompt } = require('#utils/dangerPrompt.js');
const { simpleDuration } = require('#utils/buildTimeString.js');

module.exports = async (client, message) => {
	const { prefix, devMode, jaidenServerID, generalChannelID, trustedServers } = client.config;

	// Bots shall not trigger me
	if (message.author.bot) return;

	const {
		autoResponders: { state: ar },
		aliTrust: { state: at },
		blackListing: { state: bl },
		kiritoTrust: { state: kt },
		disabledCommands
	} = fs.readJSONSync('./deployData/settings.json', 'utf-8');

	// Autoresponders
	// TODO: skip only 1 loop iteration, probably replace the 'return' with continue; equivalent.
	if (ar) {
		for (elem of autoResponders) {
			const { input, output, cooldown, regexp } = elem;

			if (!client.autoResponderCooldowns.has(elem)) client.autoResponderCooldowns.set(elem, new Discord.Collection());

			const ARnow = Date.now();
			const ARtimestamps = client.autoResponderCooldowns.get(elem);
			const ARcooldownAmount = cooldown;
			if (ARtimestamps.has(message.author.id)) {
				const ARexpirationTime = ARtimestamps.get(message.author.id) + ARcooldownAmount;
				if (ARnow < ARexpirationTime) return; // if on cooldown, don't do anything
			}

			if (regexp) {
				if (input.test(message.content.toLowerCase())) {
					message.channel.send(output);
					ARtimestamps.set(message.author.id, ARnow);
					setTimeout(() => ARtimestamps.delete(message.author.id), ARcooldownAmount);
				}
			} else {
				if (message.content.toLowerCase().includes(input)) {
					message.channel.send(output);
					ARtimestamps.set(message.author.id, ARnow);
					setTimeout(() => ARtimestamps.delete(message.author.id), ARcooldownAmount);
				}
			}
		}
	}

	// List up all commands
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Include aliases
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// Is this command allowed inside DM?
	if (message.channel.type === 'DM') {
		if (!command) return message.channel.send('Can\'t talk right now, I\'m eating tofu').catch(e => {
			throw new Tantrum(client, 'message.js', 'Error on sending can\'t talk DM', e);
		});

		if (command.isDMAllowed === false) return message.channel.send('Can\'t talk right now, I\'m eating tofu').catch(e => {
			throw new Tantrum(client, 'message.js', 'Error on sending can\'t talk DM', e);
		});
	}

	// Does the message not start with the prefix or is this not a command?
	if (!message.content.startsWith(prefix) || !command) return;

	// Is this command deprecated?
	if (command?.isDeprecated) message.reply('This command has been deprecated and will be removed soon, enjoy it while you can!').catch(e => {
		throw new Tantrum(client, 'message.js', 'Error on sending deprecated command message', e);
	});

	// Kirito trust
	if (message.author.id === banKirito && !kt) return message.reply({ content: 'You know, I really don\'t trust you, like at all. So stop messaging me!', files: ['./assets/memberTrust/banKirito.png'] }).catch(e => {
		throw new Tantrum(client, 'message.js', 'Error on sending nokirito message', e);
	});

	// Ali trust
	if (message.author.id === banAli && !at) return message.reply({ content: 'Your very existence causes me intense pain with how unfunny you are.\nNever send a message again.\nNever even fscking conceive a thought again.', files: ['./assets/memberTrust/infinitecringe.png'] }).catch(e => {
		throw new Tantrum(client, 'message.js', 'Error on sending nocringe message', e);
	});

	if (bl) {
		// Member Blacklisting
		const { python, bamboozle, hate, wrongchannel, bloop, other } = await fs.readJSONSync('./deployData/blacklist.json', 'utf-8');

		if (python.includes(message.author.id)) return message.channel.send('Come back when you stop using Python').catch(e => {
			throw new Tantrum(client, 'message.js', 'Error on sending python blacklist message', e);
		});

		else if (bamboozle.includes(message.author.id)) return message.channel.send({ content: 'Ahahahahahahah get fscked you foul piece of $h!t', files: ['./assets/blacklisting/lemao.png'] }).catch(e => {
			throw new Tantrum(client, 'message.js', 'Error on sending bamboozle blacklist message', e);
		});

		else if (hate.includes(message.author.id)) return message.channel.send('I hate you too').catch(e => {
			throw new Tantrum(client, 'message.js', 'Error on sending hate blacklist message', e);
		});

		else if (wrongchannel.includes(message.author.id)) return message.channel.send('Come back when you learn to use commands in the right place').catch(e => {
			throw new Tantrum(client, 'message.js', 'Error on sending wrongchannel blacklist message', e);
		});

		else if (bloop.includes(message.author.id)) return message.channel.send({ content: 'Haha, queen mush', files: ['./assets/blacklisting/lemao.png'] }).catch(e => {
			throw new Tantrum(client, 'message.js', 'Error on sending bloop blacklist message', e);
		});

		else if (other.includes(message.author.id)) return message.channel.send('Nope, not listening to you').catch(e => {
			throw new Tantrum(client, 'message.js', 'Error on sending other blacklist message', e);
		});
	}

	// Cooldown?
	let cooldowns = client.cooldowns;
	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = command.cooldown * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) return message.reply(`It's cool you're trying to do stuff but could you chill a bit for ${simpleDuration(expirationTime - now)} before reusing \`${command.name}\`?`).catch(e => {
			throw new Tantrum(client, 'message.js', 'Error on sending command cooldown message', e);
		});
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	if (message.guild) {
		// Check if bot is used in unauthorized server
		if (!trustedServers.includes(message.guild.id)) {
			try {
				client.users.cache.get(maxID).send({ embeds: [new Discord.MessageEmbed().setDescription(`THIS IS BAD: Tofu has been used in an untrusted server!\nServer id: ${message.guild.id}`).setColor(tofuError)] });
				return message.channel.send('This is a proprietary bot for the r/JaidenAnimations server. Please remove it from your server.');
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending untrusted server message', e);
			}
		}

		// Warn when a command is executed from the devserver to the main deploy
		if (message.guild.id !== jaidenServerID && !devMode && command.isDangerous && !(await dangerCommandPrompt(message))) return;
	}

	// Is this command enabled?
	if (disabledCommands.includes(command.name)) return message.channel.send({ content: `Hi ${message.author.username}, whaaats happening.\nWe have sort of a problem here, yeah apparently max broke this command and had to disable it.\nSo if you could try again later, that would be grrrreat. mkay?`, files: ['./assets/Configuration/commandDisabled.gif'] }).catch(e => {
		throw new Tantrum(client, 'message.js', 'Something went wrong when sending the command disabled message.', e);
	});

	// All requirements are met, try running the command
	try {
		command.execute(client, message, args);
	} catch (e) {
		throw new Tantrum(client, 'message.js', 'Something went wrong when trying to execute a command', e);
		//message.reply('Sooo i like um broke');
	}
};
