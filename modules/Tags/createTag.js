const { Util: { removeMentions } } = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'createtag',
	helpTitle: 'Create Tag',
	category: 'Tags',
	usage: 'createtag [name] [content]',
	description: 'Create your own tag',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	//aliases: [''],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!client.config.devMode) return message.channel.send('Sorry, creating tags has been disabled until the database overhaul is complete.');
		if (!args[0]) return message.channel.send('Please specify a tag.');
		if (!args[1]) return message.channel.send('Please specify the content of the tag.');
		try {
			const tag = await client.tags.create({
				name: args[0],
				description: removeMentions(args.slice(1).join(' ')),
				username: message.author.username
			});
			return message.channel.send(`Tag \`${tag.name}\` added.`).catch(e => {
				throw new Tantrum(client, 'createTag.js', 'Error on sending tag created message', e);
			});
		} catch (e) {
			console.error(e);
			console.log(args);
			if (e.name === 'SequelizeUniqueConstraintError') return message.channel.send('That tag already exists.').catch(e => {
				throw new Tantrum(client, 'createTag.js', 'Error on sending tag exists message', e);
			});

			new Tantrum(client, 'createTag.js', 'Error on creating tag', e);
			return message.channel.send('Something went wrong with adding the tag.').catch(e => {
				throw new Tantrum(client, 'createTag.js', 'Error on sending tag creation error message', e);
			});
		}
	}
};
