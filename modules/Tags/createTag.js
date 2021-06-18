const { Util: { removeMentions } } = require('discord.js');

module.exports = {
	name: 'createtag',
	helpTitle: 'Create Tag',
	category: 'Tags',
	usage: 'createtag [name] [content]',
	description: 'Create your own tag',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	//aliases: [''],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!args[0]) return message.channel.send('Please specify a tag.');
		if (!args[1]) return message.channel.send('Please specify the content of the tag.');
		console.log(args);
		try {
			const tag = await client.tags.create({
				name: args[0],
				description: removeMentions(args.slice(1).join(' ')),
				username: message.author.username
			});
			return message.channel.send(`Tag \`${tag.name}\` added.`);
		} catch (e) {
			console.error(e);
			console.log(args);
			if (e.name === 'SequelizeUniqueConstraintError') {
				return message.channel.send('That tag already exists.');
			}
			return message.channel.send('Something went wrong with adding the tag.');
		}

	}
};
