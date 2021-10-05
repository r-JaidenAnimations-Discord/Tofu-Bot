const Tantrum = require('#tantrum');
const ms = require('ms');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'seek',
	helpTitle: 'Seek',
	category: 'Music',
	usage: 'seek [{seconds/x s}]',
	description: 'Seek trough the current track',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	// aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const time = !isNaN(args[0]) ? Number(args[0]) * 1000 : ms(args[0]);

		if (isNaN(time)) return message.channel.send('That\'s not a valid time.');

		const queue = client.player.getQueue(message.guild);

		if (!queue.current) return;

		if (await queue.seek(time)) {
			await message.react('👌').catch(e => {
				throw new Tantrum(client, 'seek.js', 'Error on reacting', e);
			});
		}
	},
};
