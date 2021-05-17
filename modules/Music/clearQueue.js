const Tantrum = require('../../functions/tantrum.js');
const { checkMusic, checkQueueExists } = require('../../functions/musicChecks.js');

module.exports = {
	name: 'clearqueue',
	helpTitle: 'Clear Queue',
	category: 'Music',
	usage: 'clearqueue',
	description: 'Clear the queue.',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['clear-queue', 'cq', 'clear'],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;


		if (client.player.getQueue(message).tracks.length <= 1) {
			try {
				return message.channel.send('There is only one song in the queue.');
			} catch (e) {
				throw new Tantrum(client, 'clearQueue.js', 'Error on sending only one song queued message', e);
			}
		}

		client.player.clearQueue(message);

		try {
			message.react('👌');
		} catch (e) {
			throw new Tantrum(client, 'clearQueue.js', 'Error on reacting queue cleared', e);
		}

	},
};
