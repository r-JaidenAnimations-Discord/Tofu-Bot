const Discord = require('discord.js');
const { tofuGreen } = require('#colors');
const { formatDate } = require('#utils/formatDate.js');

module.exports = {
	name: 'taginfo',
	helpTitle: 'Tag Info',
	category: 'Tags',
	usage: 'taginfo [name]',
	description: 'Get a tag\'s info',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['tag-info', 'tagdata', 'tag-data'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!args[0]) return message.channel.send('Please specify a tag.');

		const tag = await client.tags.findOne({ where: { name: args[0] } });
		if (tag) {
			const embed = new Discord.MessageEmbed()
				.setTitle(tag.name)
				.setColor(tofuGreen)
				.addFields(
					{ name: 'Created by', value: `${tag.username}`, inline: true },
					{ name: 'Uses', value: `${tag.usage_count}` },
					{ name: 'Created at', value: `${formatDate(tag.createdAt)}` }
				);
			return message.channel.send({ embeds: [embed] });
		}
		return message.channel.send(`Couldn't find tag \`${args[0]}\`.`);

	}
};
