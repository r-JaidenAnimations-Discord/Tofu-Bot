const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'back',
	helpTitle: 'Back',
	category: 'Music',
	usage: 'back',
	description: 'Hello, I was wondering if you could play that song *again*',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['prev', 'previous'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);

		await queue.back();
		await message.react('👌');
	},
};
