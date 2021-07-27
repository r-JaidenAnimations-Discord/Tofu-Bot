module.exports = {
	name: 'edittag',
	helpTitle: 'Edit Tag',
	category: 'Tags',
	usage: 'edittag [name] [content]',
	description: 'Edits a tag\'s content',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['edit-tag', 'tagedit', 'tag-edit'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!args[0]) return message.channel.send('Please specify a tag.');
		if (!args[1]) return message.channel.send('Please specify the new content of the tag.');

		const tag = await client.tags.findOne({ where: { name: args[0] } });
		if (/*!checkStaff(message.member) || */tag.username !== message.author.username) return message.channel.send('You can\'t edit this tag.');

		const affectedRows = await client.tags.update({ description: args.slice(1).join(' ') }, { where: { name: args[0] } });

		if (affectedRows > 0) return message.channel.send(`Tag \`${args[0]}\` was edited.`);

		return message.channel.send(`Couldn't find a tag with name \`${args[0]}\`.`);
	}
};
