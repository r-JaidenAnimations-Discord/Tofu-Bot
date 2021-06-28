const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'disconnect',
	helpTitle: 'Disconnect',
	category: 'Music',
	usage: 'disconnect',
	description: 'Done? Stop the music I suppose',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['dc'],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		client.player.setRepeatMode(message, false);
		const success = client.player.stop(message);

		if (success) {
			await message.react('👋').catch(e => {
				throw new Tantrum(client, 'disconnect.js', 'Error on sending disconnected reaction', e);
			});
		} else {
			throw new Tantrum(client, 'disconnect.js', 'Error on disconnecting', 'No message');
		}
	},
};
