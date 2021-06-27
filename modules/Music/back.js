const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'back',
	helpTitle: 'Back',
	category: 'Music',
	usage: 'back',
	description: 'Hello, I was wondering if you could play that song *again*',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['prev', 'previous'],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		try {
			client.player.back(message);
			await message.react('👌');
		} catch (e) {
			throw new Tantrum(client, 'back.js', 'Error on going back in queue', e);
		}
	},
};