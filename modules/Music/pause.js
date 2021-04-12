const Tantrum = require('../../functions/tantrum.js');
const { canModifyQueue } = require('../../functions/music.js');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'pause',
	helpTitle: 'Pause',
	category: 'Music',
	usage: 'pause',
	description: 'Pause the music',
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
				throw new Tantrum(client, 'pause.js', 'Error on sending nothing playing message', e);
			}
		}

		if (!canModifyQueue(message.member)) {
			try {
				return message.reply(musicStrings.notInChannel);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'pause.js', 'Error on sending have to be in VC message', e);
			}
		}

		if (queue.playing) {
			try {
				queue.playing = false;
				queue.connection.dispatcher.pause(true);
				await message.react('⏸');
			} catch (e) {
				throw new Tantrum(client, 'pause.js', 'Error on pausing music', e);
			}

		}
	},
};
