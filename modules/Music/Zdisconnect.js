const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'disconnect',
	helpTitle: 'Disconnect',
	category: 'Music',
	usage: 'disconnect',
	description: 'Done? Stop the music I suppose',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['dc'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);

		try {
			queue.setRepeatMode(0); // Removing this results in a 'cannot use destroyed queue' message, might be a discord-player bug
			queue.destroy();
			await message.react('👋').catch(e => {
				throw new Tantrum(client, 'disconnect.js', 'Error on sending disconnected reaction', e);
			});
		} catch (e) {
			throw new Tantrum(client, 'disconnect.js', 'Error when disconnecting.', e);
		}
	},
};
