const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'seek',
	helpTitle: 'Seek',
	category: 'Music',
	usage: 'rewind',
	description: 'Go back to the start of the current track',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['rew'],
	cooldown: 0,
	execute: async function(client, message, args) {
		checkMusic(client, message);
		checkQueueExists(client, message);

		const queue = client.player.getQueue(message.guild);

		if (!queue.current) return;

		if (await queue.seek(0)) {
			await message.react('👌').catch(e => {
				throw new Tantrum(client, 'rewind.js', 'Error on reacting', e);
			});
		}
	},
};
