const Tantrum = require('../../functions/tantrum.js');
const { canModifyQueue } = require('../../functions/music.js');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'skipto',
	helpTitle: 'Skip To',
	category: 'Music',
	usage: 'skipto [queue number]',
	description: 'Skip ahead to a specific item',
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!args.length) {
			try {
				return message.channel.send(musicStrings.invalidArg);
			} catch (e) {
				throw new Tantrum(client, 'skipto.js', 'Error on sending invalid argument message', e);
			}
		}

		const queue = message.client.queue.get(message.guild.id);
		if (!queue) {
			try {
				return message.channel.send(musicStrings.nothingPlaying);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'skipto.js', 'Error on sending nothing playing message', e);
			}
		}

		if (!canModifyQueue(message.member)) {
			try {
				return message.channel.send(musicStrings.notInChannel);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'skipto.js', 'Error on sending have to be in VC message', e);
			}
		}

		if (args[0] > queue.songs.length) {
			try {
				return message.channel.send(`Invalid query, queue is only ${queue.songs.length} songs long!`);
			} catch (e) {
				throw new Tantrum(client, 'skipto.js', 'Error on sending invalid argument message', e);
			}
		}

		queue.playing = true;

		if (queue.loop) {
			for (let i = 0; i < args[0] - 2; i++) {
				queue.songs.push(queue.songs.shift());
			}
		} else {
			queue.songs = queue.songs.slice(args[0] - 2);
		}

		queue.connection.dispatcher.end();
		await message.react('👌');
	},
};
