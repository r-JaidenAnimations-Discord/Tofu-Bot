const { Util: { removeMentions } } = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMessageStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'createtag',
	helpTitle: 'Create Tag',
	category: 'Tags',
	usage: 'createtag (staff) [name] [content]',
	description: 'Create your own tag',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	mainServerOnly: true,
	isHidden: false,
	aliases: ['addtag'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!args[0]) return message.channel.send('Please specify a tag.');
		if (!args[1]) return message.channel.send('Please specify the content of the tag.');

		let name = args[0], desc = args.slice(1).join(' ');
		
		if (client.commands.has(name)) return message.channel.send('Nope, don\'t add my command names, nope.');

		if (args[0] === 'staff') {
			if (!checkMessageStaff(client, message, true)) return;
			name = args[1]; desc = args.slice(2).join(' ');
		}

		try {
			const tag = await client.tags.create({
				name,
				description: removeMentions(desc),
				username: message.author.username,
				userID: message.author.id,
				staffOnly: args[0] === 'staff'
			});
			return message.channel.send(`Tag \`${tag.name}\` added.`).catch(e => {
				throw new Tantrum(client, 'createTag.js', 'Error on sending tag created message', e);
			});
		} catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') return message.channel.send('That tag already exists.').catch(e => {
				throw new Tantrum(client, 'createTag.js', 'Error on sending tag exists message', e);
			});
			return message.channel.send('Something went wrong with creating the tag.').catch(e => {
				throw new Tantrum(client, 'createTag.js', 'Error on sending tag creation error message', e);
			});
		}
	}
};
