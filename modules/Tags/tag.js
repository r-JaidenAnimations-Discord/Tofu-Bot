const { checkMessageStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'tag',
	helpTitle: 'Get Tag',
	category: 'Tags',
	usage: 'tag [name]',
	description: 'Gets the content of a tag',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['t', 'gettag'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!args[0]) return message.channel.send('Please specify a tag.');

		const tag = await client.tags.findOne({ where: { name: args[0] } });

		if (tag?.staffOnly && !checkMessageStaff(client, message, false)) return message.channel.send('You can\'t use a staff only tag.');

		if (!tag) return message.channel.send(`Couldn't find tag: \`${args[0]}\``);

		tag.increment('usage_count');
		return message.channel.send(tag.get('description'));
	}
};
