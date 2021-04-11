const Tantrum = require('../../functions/tantrum.js');
const { canModifyQueue } = require('../../functions/music.js');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'loop',
	helpTitle: 'Loop',
	category: 'Music',
	usage: 'loop',
	description: 'Toggle looping',
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		const queue = message.client.queue.get(message.guild.id);

		if (!queue) {
			try {
				return message.channel.send(musicStrings.nothingPlaying);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'loop.js', 'Error on sending nothing playing message', e);
			}
		}

		if (!canModifyQueue(message.member)) {
			try {
				return message.reply(musicStrings.notInChannel);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'loop.js', 'Error on sending have to be in VC message', e);
			}
		}

		// toggle
		queue.loop = !queue.loop;
		try {
			return queue.textChannel.send(`${queue.loop ? 'Enabled' : 'Disabled'} looping`);
		} catch (e) {
			console.error(e);
			throw new Tantrum(client, 'loop.js', 'Error on sending toggled loop message', e);
		}
	},
};
