const { tofuGreen, tofuRed, maxID } = require('../../config.json');
const Discord = require('discord.js');
const fs = require('fs');
const Tantrum = require('../../functions/tantrum.js');
//const { handleError } = require('../../functions/errorHandler.js');
const { writeJSONSync } = require('fs-extra');

module.exports = {
	name: 'blacklist',
	helpTitle: 'Blacklist member',
	category: 'Bot Management',
	usage: 'blacklist {[{id, mention}], [{python, bamboozle, hate, wrongchannel, other}]}',
	description: 'blacklist',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['bl'],
	cooldown: 5,
	execute: async function(client, message, args) {
		let toBlacklist = false;

		// Pull the blacklist JSON
		const raw = await fs.readFileSync('./deployData/blacklist.json', 'utf-8');
		var blackListJSON = JSON.parse(raw);

		if (message.mentions.members.first()) {
			toBlacklist = message.mentions.members.first().id;
		} else if (/^\d{18}$/.test(args[0])) { // regex AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
			toBlacklist = args[0];
		}
		else {
			try {
				return message.channel.send('No member specified');
			} catch (e) {
				//return handleError(client, 'addBlacklist.js', 'Error on sending no user defined message', e);
				throw new Tantrum(client, 'addBlacklist.js', 'Error on sending no user defined message', e);
			}
		}

		if (toBlacklist == message.author.id) {
			try {
				return message.channel.send('Can\'t blacklist yourself. What the FRICK are you trying to do?');
			} catch (e) {
				//return handleError(client, 'addBlacklist.js', 'Error on sending can\'t blacklist yourself message');
				throw new Tantrum(client, 'addBlacklist.js', 'Error on sending can\'t blacklist yourself message');
			}
		}

		if (toBlacklist == maxID) {
			try {
				message.channel.send('Oh you sly fox, trying to bamboozle me. Get blacklisted LMAO');
				console.log(blackListJSON.bamboozle)
				blackListJSON.bamboozle.push(message.author.id);
				return writeJSONSync('./deployData/blacklist.json', blackListJSON, { spaces: 4 });
			} catch (e) {
				//return handleError(client, 'addBlacklist.js', 'Error on sending get blacklisted message');
				throw new Tantrum(client, 'addBlacklist.js', 'Error on sending get blacklisted message');
			}
		}

		if (!message.member.hasPermission('BAN_MEMBERS')) {
			try {
				return message.reply('You fool, need more permissions');
			} catch (e) {
				//return handleError(client, 'addBlacklist.js', 'Error on sending permission error', e);
				throw new Tantrum(client, 'addBlacklist.js', 'Error on sending permission error', e);
			}
		}

		let category = args[1];
		if (!category) {
			try {
				return message.channel.send('Give me a category to put them in though');
			} catch (e) {
				//return handleError(client, 'addBlacklist.js', 'Error on sending no category defined message', e);
				throw new Tantrum(client, 'addBlacklist.js', 'Error on sending no category defined message', e);
			}
		}

		const categories = ['python', 'bamboozle', 'hate', 'wrongchannel', 'bloop', 'other'];
		for (category of categories) {
			if (blackListJSON[category].includes(toBlacklist)) {
				try {
					const alreadyBlacklistedEmbed = new Discord.MessageEmbed()
						.setTitle('Error')
						.setColor(tofuRed)
						.setDescription(`This member is already blacklisted in the \`${category}\` list.`)
						.setTimestamp();

					message.channel.send(alreadyBlacklistedEmbed);
					return;
				} catch (e) {
					//return handleError(client, 'addBlacklist.js', 'Error on sending member already in blacklist category message.', e);
					throw new Tantrum(client, 'addBlacklist.js', 'Error on sending member already in blacklist category message.', e);
				}
			}
		}

		//what if, yeah works better
		switch (args[1]) {
			case 'python':
			case 'bamboozle':
			case 'hate':
			case 'wrongchannel':
			case 'bloop':
			case 'other':
				blackListJSON[args[1]].push(toBlacklist);
				break;
			default:
				try {
					const invalidCategoryEmbed = new Discord.MessageEmbed()
						.setTitle('Error')
						.setColor(tofuRed)
						.setDescription(`\`${args[1]}\` is not a valid category.\nConsider checking the help command.`)
						.setTimestamp();

					message.channel.send(invalidCategoryEmbed);
					return;
				} catch (e) {
					//return handleError(client, 'addBlacklist.js', 'Error on sending invalid category message', e);
					throw new Tantrum(client, 'addBlacklist.js', 'Error on sending invalid category message', e);
				}
				break;
		}

		try {
			writeJSONSync('./deployData/blacklist.json', blackListJSON, { spaces: 4 });
			const blackListEmbed = new Discord.MessageEmbed()
				.setTitle('Added to blacklist')
				.setColor(tofuGreen)
				.setDescription(`Added <@${toBlacklist}> to the \`${args[1]}\` list.`)
				.setTimestamp();

			message.channel.send(blackListEmbed);
			return;
		} catch (e) {
			//return handleError(client, 'addBlacklist.js', 'Error on saving blacklist settings', e);
			throw new Tantrum(client, 'addBlacklist.js', 'Error on saving blacklist settings', e);
		}
	},
};
