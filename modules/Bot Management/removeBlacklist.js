const { tofuGreen, tofuRed } = require('#colors');
const Discord = require('discord.js');
const fs = require('fs');
const { writeJSONSync } = require('fs-extra');
const { checkBanStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'whitelist',
	helpTitle: 'Whitelist member',
	category: 'Bot Management',
	usage: 'whitelist [{id, mention}]',
	description: 'blacklist',
	isDMAllowed: false,
	isDangerous: true,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['wl'],
	cooldown: 5,
	execute: async function(client, message, args) {

		if (!checkBanStaff(client, message, true)) return;

		// Pull the blacklist JSON
		const raw = await fs.readFileSync('./deployData/blacklist.json', 'utf-8');
		var blackListJSON = JSON.parse(raw);

		let toWhitelist = null;
		if (message.mentions.members.first()) {
			toWhitelist = message.mentions.members.first().id;
		} else if (/^\d{18}$/.test(args[0])) { // regex AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
			toWhitelist = args[0];
		}
		else {
			return message.channel.send('No member specified');
		}

		if (blackListJSON.find(({ member }) => member === toWhitelist)) {
			blackListJSON.splice(blackListJSON.indexOf(blackListJSON.find(({ member }) => member === toWhitelist)), 1);
			writeJSONSync('./deployData/blacklist.json', blackListJSON, { spaces: 4 });
			const whitelistEmbed = new Discord.MessageEmbed()
				.setTitle('Removed from blacklist')
				.setColor(tofuGreen)
				.setDescription(`Removed <@${toWhitelist}> from the blacklist.`)
				.setTimestamp();

			message.channel.send({ embeds: [whitelistEmbed] });
			return;
		}

		const memberNotFoundEmbed = new Discord.MessageEmbed()
			.setTitle('Error')
			.setColor(tofuRed)
			.setDescription(`Couldn't find <@${toWhitelist}> anywhere in the blacklist.`)
			.setTimestamp();

		message.channel.send({ embeds: [memberNotFoundEmbed] });
	},
};
