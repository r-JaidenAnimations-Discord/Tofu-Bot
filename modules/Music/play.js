/**
 * Dear future me. Please forgive me. I can't even begin to express how sorry I am.
 */
const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic } = require('#utils/musicChecks.js');

module.exports = {
	name: 'play',
	helpTitle: 'Play',
	category: 'Music',
	usage: 'play [query]',
	description: 'Play some choons',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['p'],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;

		// TODO: Refactor and update for resume
		// if (client.player.getQueue(message)) {
		// 	if (client.player.getQueue(message).paused && !args[0]) {
		// 		const success = client.player.resume(message);

		// 		// We have to do this because of a bug in discord.js
		// 		//client.player.resume(message);
		// 		client.player.pause(message);
		// 		client.player.resume(message);

		// 		if (success) {
		// 			return await message.react('👌').catch(e => {
		// 				throw new Tantrum(client, 'play.js', 'Error on reacting resume', e);
		// 			});
		// 		} else {
		// 			throw new Tantrum(client, 'play.js', 'Error on resuming', 'No message');
		// 		}
		// 	}
		// }

		if (!args[0]) {
			const noQueryEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('To play a song, you need to specify which song you want to play!');

			return message.channel.send({ embeds: [noQueryEmbed] }).catch(e => {
				throw new Tantrum(client, 'play.js', 'Error on sending no query defined message', e);
			});
		}

		// await client.player.play(message, args.join(' '), { firstResult: true });
		const queue = client.player.createQueue(message.guild, {
			metadata: message
		});
		const song = await client.player.search(args.join(' '), {
			requestedBy: message.author
		});

		await queue.connect(message.member.voice.channel).catch(e => {
			message.channel.send('Something went wrong when joining').catch(f => {
				throw new Tantrum(client, 'play.js', 'Error on sending failed to join message', e);
			})
		});

		queue.addTrack(song.tracks[0]);
		queue.play();
	},
};
