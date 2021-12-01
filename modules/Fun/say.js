const { tofuGreen } = require('#colors');
const { MessageEmbed } = require('discord.js');
const { checkMessageStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'say',
	helpTitle: 'Say',
	category: 'Fun',
	usage: 'say [#channel] (embed) [message]',
	description: 'Mess with members',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	// aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		const channel = message.mentions.channels.first() ||
			message.guild.channels.cache.find(c => c.id === args[0]) ||
			message.guild.channels.cache.find(c => c.name === args[0]);

		if (!checkMessageStaff(client, message, true)) return;


		if (!channel) return message.channel.send('Where the actual F*CK do you want me to put that? My ass?');

		if (args[1] === 'embed') {
			if (!args.slice(2).join(' ')) return message.reply('All fine and good, but like. What to send. Can\'t you guys do this first try for once?');

			const embed = new MessageEmbed()
				.setColor(tofuGreen)
				.setDescription(args.slice(2).join(' '));

			channel.send({ embeds: [embed] });
			await message.react('✅');
		}
		else {
			if (!args.slice(1).join(' ')) return message.reply('All fine and good, but like. What to send. Can\'t you guys do this first try for once?');

			channel.send(args.slice(1).join(' '));
			await message.react('✅');
		}
	},
};
