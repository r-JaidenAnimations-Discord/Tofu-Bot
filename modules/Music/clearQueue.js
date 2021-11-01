const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'clearqueue',
	helpTitle: 'Clear Queue',
	category: 'Music',
	usage: 'clearqueue',
	description: 'Clear the queue.',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['clear-queue', 'cq', 'clear'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);

		// TODO: do this for v5
		// if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send('There is only one song in the queue.').catch(e => {
		// throw new Tantrum(client, 'clearQueue.js', 'Error on sending only one song queued message', e);
		// });

		queue.clear();

		await message.react('👌').catch(e => {
			throw new Tantrum(client, 'clearQueue.js', 'Error on reacting queue cleared', e);
		});
	},
};
