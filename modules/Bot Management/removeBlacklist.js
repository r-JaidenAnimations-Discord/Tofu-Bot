//const { tofuGreen, tofuRed } = require('../../config.json');
const { tofuGreen, tofuRed } = require('#colors');
const Discord = require('discord.js');
const fs = require('fs');
const Tantrum = require('#tantrum');
const { writeJSONSync } = require('fs-extra');

module.exports = {
	name: 'whitelist',
	helpTitle: 'Whitelist member',
	category: 'Bot Management',
	usage: 'whitelist [{id, mention}]',
	description: 'blacklist',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	aliases: ['wl'],
	cooldown: 5,
	execute: async function(client, message, args) {
		// const { tofuGreen, tofuRed } = client.config;

		if (!message.member.hasPermission('BAN_MEMBERS')) {
			try {
				return message.reply('You fool, need more permissions');
			} catch (e) {
				throw new Tantrum(client, 'removeBlacklist.js', 'Error on sending permission error', e);
			}
		}

		// Pull the blacklist JSON
		const raw = await fs.readFileSync('./deployData/blacklist.json', 'utf-8');
		var blackListJSON = JSON.parse(raw);

		let toWhitelist = false;
		if (message.mentions.members.first()) {
			toWhitelist = message.mentions.members.first().id;
		} else if (/^\d{18}$/.test(args[0])) { // regex AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
			toWhitelist = args[0];
		}
		else {
			try {
				return message.channel.send('No member specified');
			} catch (e) {
				throw new Tantrum(client, 'removeBlacklist.js', 'Error on sending no user defined message', e);
			}
		}

		const categories = ['python', 'bamboozle', 'hate', 'wrongchannel', 'bloop', 'other'];
		for (blackListCategory of categories) {
			if (blackListJSON[blackListCategory].includes(toWhitelist)) {
				try {
					blackListJSON[blackListCategory].splice(blackListJSON[blackListCategory].indexOf(toWhitelist), 1);
					writeJSONSync('./deployData/blacklist.json', blackListJSON, { spaces: 4 });
					const whitelistEmbed = new Discord.MessageEmbed()
						.setTitle('Removed from blacklist')
						.setColor(tofuGreen)
						.setDescription(`Removed <@${toWhitelist}> from the \`${blackListCategory}\` list.`)
						.setTimestamp();

					message.channel.send(whitelistEmbed);
					return;
				} catch (e) {
					throw new Tantrum(client, 'removeBlacklist.js', 'Error on whitelisting member.', e);
				}
			}
		}

		try {
			const memberNotFoundEmbed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setColor(tofuRed)
				.setDescription(`Couldn't find <@${toWhitelist}> anywhere in the blacklist.`)
				.setTimestamp();

			message.channel.send(memberNotFoundEmbed);
		} catch (e) {
			throw new Tantrum(client, 'removeBlacklist.js', 'Error on sending membernotfound embed', e);
		}
	},
};
