module.exports = {
	name: 'deletetag',
	helpTitle: 'Delete Tag',
	category: 'Tags',
	usage: 'deletetag [name]',
	description: 'Deletes a tag from the database',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['deltag', 'delete-tag', 'tagdelete', 'tag-delete'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!args[0]) return message.channel.send('Please specify a tag.');

		const tag = await client.tags.findOne({ where: { name: args[0] } });
		if (!tag) return message.channel.send(`The tag \`${args[0]}\` doesn't exist.`);

		if (/* !checkStaff(message.member) || */tag.userID !== message.author.id) return message.channel.send('You can\'t delete this tag.');
		await client.tags.destroy({ where: { name: args[0] } });
		return message.channel.send('Tag deleted.');
	}
};
