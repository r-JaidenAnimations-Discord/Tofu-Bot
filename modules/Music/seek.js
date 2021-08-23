const Tantrum = require('#utils/tantrum.js');
const ms = require('ms');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'seek',
	helpTitle: 'Seek',
	category: 'Music',
	usage: 'not yet',
	description: 'Coming soon: seek trough the current track!',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: true,
	// aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		checkMusic(client, message)
		checkQueueExists(client, message)

		const time = !isNaN(args[0]) ? Number(args[0]) * 1000 : ms(args[0]);

		if (isNaN(time) || Number(args[0]) <= 0) return message.channel.send('That\'s not a valid time.')

		const queue = client.player.getQueue(message.guild)

		if (!queue.current) return;

		if (await queue.seek(time)) {
			await message.react('👌').catch(e => {
				throw new Tantrum(client, 'seek.js', 'Error on reacting', e);
			})
		}
	},
};
