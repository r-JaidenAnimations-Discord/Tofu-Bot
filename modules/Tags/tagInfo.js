const Discord = require('discord.js');
const { tofuGreen } = require('#colors');

module.exports = {
	name: 'taginfo',
	helpTitle: 'Tag Info',
	category: 'Tags',
	usage: 'taginfo [name]',
	description: 'Get a tag\'s info',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['tag-info', 'tagdata', 'tag-data'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!args[0]) return message.channel.send('Please specify a tag.');

		const tag = await bot.tags.findOne({ where: { name: args[0] } });
		if (tag) {
			const embed = new MessageEmbed()
				.setTitle(tag.name)
				.setColor(ForestGreen)
				.addFields(
					{ name: 'Created by', value: tag.username, inline: true },
					{ name: 'Uses', value: tag.usage_count },
					{ name: 'Created at', value: formatDate(tag.createdAt) }
				);
			return message.channel.send(embed);
		}
		return message.channel.send(`Couldn't find tag \`${args[0]}\`.`);

	}
};
