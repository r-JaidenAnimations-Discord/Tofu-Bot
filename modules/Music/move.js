const Tantrum = require('../../functions/tantrum.js');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'move',
	helpTitle: 'Move',
	category: 'Music',
	usage: 'move [queuenumber]',
	description: 'Move songs around the queue',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['mv'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const queue = message.client.queue.get(message.guild.id);

		if (!queue) {
			try {
				return message.channel.send(musicStrings.noQueue);
			} catch (e) {
				throw new Tantrum(client, 'move.js', 'Error on sending no queue message', e);
			}
		}

		if (!canModifyQueue(message.member)) {
			try {
				return message.reply(musicStrings.notInChannel);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'move.js', 'Error on sending have to be in VC message', e);
			}
		}

		if (!args.length) {
			try {
				return message.channel.send(musicStrings.invalidArg);
			} catch (e) {
				throw new Tantrum(client, 'move.js', 'Error on sending invalid argument message', e);
			}
		}

		if (isNaN(args[0]) || args[0] <= 1) {
			try {
				return message.channel.send(musicStrings.invalidArg);
			} catch (e) {
				throw new Tantrum(client, 'move.js', 'Error on sending invalid argument message', e);
			}
		}

		let song = queue.songs[args[0] - 1];

		queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);

		try {
			queue.textChannel.send(`Moved **${song.title}** to  postition **${args[1] == 1 ? 1 : args[1]}**`);
		} catch (e) {
			new Tantrum(client, 'move.js', 'Error on sending new position message', e);
		}

	},
};
