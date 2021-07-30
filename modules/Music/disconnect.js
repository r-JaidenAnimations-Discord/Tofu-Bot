const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'disconnect',
	helpTitle: 'Disconnect',
	category: 'Music',
	usage: 'disconnect',
	description: 'Done? Stop the music I suppose',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['dc'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);
		if (!queue) return message.channel.send('no queue exists');

		try {
			queue.setRepeatMode(0);
			queue.destroy();
			await message.react('👋').catch(e => {
				throw new Tantrum(client, 'disconnect.js', 'Error on sending disconnected reaction', e);
			});
		} catch (e) {
			throw new Tantrum(client, 'disconnect.js', 'Error when disconnecting.', e);
		}
	},
};
