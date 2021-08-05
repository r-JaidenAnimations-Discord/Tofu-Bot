const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'shuffle',
	helpTitle: 'Shuffle',
	category: 'Music',
	usage: 'shuffle',
	description: 'Feelin\' random?',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['randomize'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);

		if (queue.shuffle()) { // TODO: test once i figure out adding multiple tracks
			await message.react('🔀').catch(e => {
				throw new Tantrum(client, 'shuffle.js', 'Error sending shuffled message', e);
			});
		} else {
			throw new Tantrum(client, 'shuffle.js', 'Error on shuffling music', 'No message');
		}
	},
};
