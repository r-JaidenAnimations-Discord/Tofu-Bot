const { maxID } = require('#memberIDs');
const { tofuGreen, tofuRed } = require('#colors');
const Discord = require('discord.js');
const fs = require('fs');
const Tantrum = require('#tantrum');
const { writeJSONSync } = require('fs-extra');
const { checkBanStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'blacklist',
	helpTitle: 'Blacklist member',
	category: 'Bot Management',
	usage: 'blacklist {[{id, mention}], [{python, bamboozle, hate, wrongchannel, other}]}',
	description: 'blacklist',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	isHidden: false,
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
			return message.channel.send('No member specified').catch(e => {
				throw new Tantrum(client, 'addBlacklist.js', 'Error on sending no user defined message', e);
			});
		}

		if (toBlacklist === message.author.id) return message.channel.send('Can\'t blacklist yourself. What the FRICK are you trying to do?').catch(e => {
			throw new Tantrum(client, 'addBlacklist.js', 'Error on sending can\'t blacklist yourself message');
		});

		if (toBlacklist === maxID) {
			try {
				message.channel.send('Oh you sly fox, trying to bamboozle me. Get blacklisted LMAO');
				console.log(blackListJSON.bamboozle)
				blackListJSON.bamboozle.push(message.author.id);
				return writeJSONSync('./deployData/blacklist.json', blackListJSON, { spaces: 4 });
			} catch (e) {
				throw new Tantrum(client, 'addBlacklist.js', 'Error on sending get blacklisted message');
			}
		}

		if (!checkBanStaff(client, message)) return;

		let category = args[1];
		if (!category) return message.channel.send('Give me a category to put them in though').catch(e => {
			throw new Tantrum(client, 'addBlacklist.js', 'Error on sending no category defined message', e);
		});

		const categories = ['python', 'bamboozle', 'hate', 'wrongchannel', 'bloop', 'other'];
		for (category of categories) {
			if (blackListJSON[category].includes(toBlacklist)) {
				const alreadyBlacklistedEmbed = new Discord.MessageEmbed()
					.setTitle('Error')
					.setColor(tofuRed)
					.setDescription(`This member is already blacklisted in the \`${category}\` list.`)
					.setTimestamp();

				return message.channel.send({ embeds: [alreadyBlacklistedEmbed] }).catch(e => {
					throw new Tantrum(client, 'addBlacklist.js', 'Error on sending member already in blacklist category message.', e);
				});
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
				const invalidCategoryEmbed = new Discord.MessageEmbed()
					.setTitle('Error')
					.setColor(tofuRed)
					.setDescription(`\`${args[1]}\` is not a valid category.\nConsider checking the help command.`)
					.setTimestamp();

				message.channel.send({ embeds: [invalidCategoryEmbed] }).catch(e => {
					throw new Tantrum(client, 'addBlacklist.js', 'Error on sending invalid category message', e);
				});
				break;
		}

		try {
			writeJSONSync('./deployData/blacklist.json', blackListJSON, { spaces: 4 });
			const blackListEmbed = new Discord.MessageEmbed()
				.setTitle('Added to blacklist')
				.setColor(tofuGreen)
				.setDescription(`Added <@${toBlacklist}> to the \`${args[1]}\` list.`)
				.setTimestamp();

			message.channel.send({ embeds: [blackListEmbed] });
		} catch (e) {
			throw new Tantrum(client, 'addBlacklist.js', 'Error on saving blacklist settings', e);
		}
	},
};
