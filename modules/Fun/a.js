const { shrimpID } = require('#memberIDs');

module.exports = {
	name: 'a',
	helpTitle: 'a',
	category: 'Fun',
	usage: 'a',
	description: 'Shrimp',
	isDMAllowed: false,
	isDangerous: true,
	mainServerOnly: false,
	isHidden: true,
	// aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (message.author.id !== shrimpID) return message.channel.send('ahahahhahahah are you shrimp? Only the all mighty shrimp can use this almighty command! **vanish**');

		message.channel.send('a.');
	},
};
