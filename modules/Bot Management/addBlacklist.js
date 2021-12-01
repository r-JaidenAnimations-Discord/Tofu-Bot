const { maxID } = require('#memberIDs');
const { tofuGreen, tofuRed } = require('#colors');
const Discord = require('discord.js');
const fs = require('fs');
const { writeJSONSync } = require('fs-extra');
const { checkBanStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'blacklist',
	helpTitle: 'Blacklist member',
	category: 'Bot Management',
	usage: 'blacklist {[{id, mention}], [{python, bamboozle, hate, wrongchannel, other}]}',
	description: 'blacklist',
	isDMAllowed: false,
	isDangerous: true,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['bl'],
	cooldown: 5,
	execute: async function(client, message, args) {

		let toBlacklist = null;
		let reason = args.slice(1).join(' ');

		// Pull the blacklist JSON
		const raw = await fs.readFileSync('./deployData/blacklist.json', 'utf-8');
		var blackListJSON = JSON.parse(raw);

		if (message.mentions.members.first()) {
			toBlacklist = message.mentions.members.first().id;
		} else if (/^\d{18}$/.test(args[0])) { // regex AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
			toBlacklist = args[0];
		}
		else {
			return message.channel.send('No member specified');
		}

		if (toBlacklist === message.author.id) return message.channel.send('Can\'t blacklist yourself. What the FRICK are you trying to do?');

		if (toBlacklist === maxID) {
			message.channel.send('Oh you sly fox, trying to bamboozle me. Get blacklisted LMAO');
			blackListJSON.push({
				member: message.author.id,
				reason: 'Bamboozle attempt',
				date: Date.now()
			});
			return writeJSONSync('./deployData/blacklist.json', blackListJSON, { spaces: 4 });
		}

		if (!checkBanStaff(client, message, true)) return;

		if (!reason) return message.channel.send('No reason provided');

		if (blackListJSON.find(({ member }) => member === toBlacklist)) {
			const alreadyBlacklistedEmbed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setColor(tofuRed)
				.setDescription('This member is already blacklisted.')
				.setTimestamp();

			return message.channel.send({ embeds: [alreadyBlacklistedEmbed] });
		}

		blackListJSON.push({
			member: toBlacklist,
			reason,
			date: Date.now()
		});

		writeJSONSync('./deployData/blacklist.json', blackListJSON, { spaces: 4 });
		const blackListEmbed = new Discord.MessageEmbed()
			.setTitle('Added to blacklist')
			.setColor(tofuGreen)
			.setDescription(`Added <@${toBlacklist}> to the blacklist.`)
			.setTimestamp();

		message.channel.send({ embeds: [blackListEmbed] });
	},
};
