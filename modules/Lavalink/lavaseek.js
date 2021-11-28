const Tantrum = require('#tantrum');
const ms = require('ms');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'lseek',
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
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;


		const time = !isNaN(args[0]) ? Number(args[0]) * 1000 : ms(args[0]);

		if (isNaN(time)) return message.channel.send('That\'s not a valid time.');

		const player = await LavaManager.getPlayer(client, message);

		if (!player) return;

		if (await player.seek(time)) {
			await message.react('👌').catch(e => {
				throw new Tantrum(client, 'seek.js', 'Error on reacting', e);
			});
		}
	},
};
