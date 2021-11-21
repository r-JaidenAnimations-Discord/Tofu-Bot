const { tofuRed, tofuError } = require('#colors');
const { maxID } = require('#memberIDs');
const Discord = require('discord.js');
const fs = require('fs-extra');
const { autoResponders } = require('../../handlers/autoResponder.js');
const { dangerCommandPrompt } = require('#utils/dangerPrompt.js');
const { simpleDuration } = require('#utils/buildTimeString.js');
const { notifyMaintenance } = require('#utils/maintenanceNotifier.js');
const Tantrum = require('#tantrum');

module.exports = async (client, message) => {
	const { prefix, devMode, jaidenServerID, generalChannelID, trustedServers, tofuBotServerID, maintenance } = client.config;

	// Bots shall not trigger me
	if (message.author.bot) return;

	const {
		autoResponders: { state: ar },
		dadBot: { state: dad },
		blackListing: { state: bl },
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
			if (ARtimestamps.has(message.guild.id)) {
				const ARexpirationTime = ARtimestamps.get(message.guild.id) + ARcooldownAmount;
				if (ARnow < ARexpirationTime) return; // if on cooldown, don't do anything
			}

			if (regexp) {
				if (input.test(message.content.toLowerCase())) {
					message.channel.send(output);
					ARtimestamps.set(message.guild.id, ARnow);
					setTimeout(() => ARtimestamps.delete(message.guild.id), ARcooldownAmount);
				}
			} else {
				if (message.content.toLowerCase().includes(input)) {
					message.channel.send(output);
					ARtimestamps.set(message.guild.id, ARnow);
					setTimeout(() => ARtimestamps.delete(message.guild.id), ARcooldownAmount);
				}
			}
		}
	}

	// Hey bot, i'm dad
	if (dad) {
		const IM_MATCH = /\b((?:i|l)(?:(?:'|`|‛|‘|’|′|‵)?m| am)) ([\s\S]*)/i;
		const FORMAT_MATCH = /(\*\*?\*?|``?`?|__?|~~|\|\|)+/i;

		if (message.content.match(IM_MATCH)) {
			let imMatchData = message.content.match(IM_MATCH),
				formattingMatchData = message.content.match(FORMAT_MATCH);

			if (!formattingMatchData || formattingMatchData.index > imMatchData.index) {
				message.channel.send(`Hi ${imMatchData[2]}, I'm Dad`);
			} else {
				message.channel.send(`Hi ${formattingMatchData[0]}${imMatchData[2]}, I'm Dad`);
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
		if (!command) return message.channel.send('Can\'t talk right now, I\'m eating tofu');

		if (!command.isDMAllowed) return message.channel.send('Can\'t talk right now, I\'m eating tofu');
	}

	// Does the message not start with the prefix or is this not a command?
	if (!message.content.toLowerCase().startsWith(prefix) || !command) return;

	// Is the command only allowed for the main server and is the server elegible
	if (command.mainServerOnly && ![jaidenServerID, tofuBotServerID].includes(message.guild.id)) return;

	// Member Blacklisting
	if (bl) {
		const blacklist = await fs.readJSONSync('./deployData/blacklist.json', 'utf-8');

		if (blacklist.find(({ member }) => member === message.author.id)) return message.channel.send('Nope, not listening to you');
	}

	if (maintenance) notifyMaintenance(message);

	// Cooldown?
	let cooldowns = client.cooldowns;
	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = command.cooldown * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) return message.reply(`It's cool you're trying to do stuff but could you chill a bit for ${simpleDuration(expirationTime - now)} before reusing \`${command.name}\`?`);
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	if (message.guild) {
		// Check if bot is used in unauthorized server
		if (!trustedServers.includes(message.guild.id)) {
			client.users.cache.get(maxID).send({ embeds: [new Discord.MessageEmbed().setDescription(`THIS IS (NOT) BAD: Tofu has been used in an untrusted server!\nServer id: ${message.guild.id}`).setColor(tofuError)] });
			return message.channel.send('This is a proprietary bot for the r/JaidenAnimations server. Please remove it from your server.');
		}

		// Warn when a command is executed from the devserver to the main deploy
		if (message.guild.id !== jaidenServerID && !devMode && command.isDangerous && !(await dangerCommandPrompt(message))) return;
	}

	// Is this command enabled?
	if (disabledCommands.includes(command.name)) return message.channel.send({ content: `Hi ${message.author.username}, whaaats happening.\nWe have sort of a problem here, yeah apparently max broke this command and had to disable it.\nSo if you could try again later, that would be grrrreat. mkay?`, files: ['./assets/Configuration/commandDisabled.gif'] });

	// All requirements are met, try running the command
	try {
		command.execute(client, message, args);
	} catch (e) {
		throw new Tantrum(client, e);
	}
};
