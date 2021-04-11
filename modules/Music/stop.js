const Tantrum = require('../../functions/tantrum.js');
const { canModifyQueue } = require('../../functions/music.js');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'stop',
	helpTitle: 'Stop',
	category: 'Music',
	usage: 'stop',
	description: 'Do I really have to explain it?',
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
				throw new Tantrum(client, 'stop.js', 'Error on sending nothing playing message', e);
			}
		}

		if (!canModifyQueue(message.member)) {
			try {
				return message.channel.send(musicStrings.notInChannel);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'stop.js', 'Error on sending have to be in VC message', e);
			}
		}

		queue.songs = [];
		queue.connection.dispatcher.end();
		await message.react('🛑');
	},
};
