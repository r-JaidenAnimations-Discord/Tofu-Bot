const Tantrum = require('../../functions/tantrum.js');
const { canModifyQueue } = require('../../functions/music.js');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'shuffle',
	helpTitle: 'Shuffle',
	category: 'Music',
	usage: 'shuffle',
	description: 'Feelin\' random?',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['randomize'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const queue = message.client.queue.get(message.guild.id);
		if (!queue) {
			try {
				return message.channel.send(musicStrings.nothingPlaying);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'shuffle.js', 'Error on sending nothing playing message', e);
			}
		}

		if (!canModifyQueue(message.member)) {
			try {
				return message.channel.send(musicStrings.notInChannel);
			} catch (e) {
				console.error(e);
				throw new Tantrum(client, 'shuffle.js', 'Error on sending have to be in VC message', e);
			}
		}

		let songs = queue.songs;
		for (let i = songs.length - 1; i > 1; i--) {
			let j = 1 + Math.floor(Math.random() * i);
			[songs[i], songs[j]] = [songs[j], songs[i]];
		}
		queue.songs = songs;
		message.client.queue.set(message.guild.id, queue);
		await message.react('🔀');
	},
};
