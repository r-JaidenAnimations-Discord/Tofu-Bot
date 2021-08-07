/**
 * Dear future me. Please forgive me. I can't even begin to express how sorry I am.
 */
const { tofuOrange, tofuError } = require('#colors');
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

		const resumeQueue = client.player.getQueue(message.guild);
		if (resumeQueue && resumeQueue.connection?.paused) {
			if (resumeQueue.setPaused(false)) {
				return await message.react('👌').catch(e => {
					throw new Tantrum(client, 'play.js', 'Error on reacting resume', e);
				});
			} else {
				throw new Tantrum(client, 'play.js', 'Error on resuming', 'No message');
			}
		}

		if (!args[0]) {
			const noQueryEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('To play a song, you need to specify which song you want to play!');

			return message.channel.send({ embeds: [noQueryEmbed] }).catch(e => {
				throw new Tantrum(client, 'play.js', 'Error on sending no query defined message', e);
			});
		}

		const queue = client.player.createQueue(message.guild, {
			// i think this is the way

			leaveOnEnd: false,
			// leaveOnStop: null,
			// leaveOnEmpty: null,
			leaveOnEmptyCooldown: 10000,
			autoSelfDeaf: true,
			metadata: message
		});
		const track = await client.player.search(args.join(' '), {
			requestedBy: message.author
		});

		if (!track) {
			const noResultsEmbed = new Discord.MessageEmbed()
				.setColor(tofuError)
				.setDescription('No matches found!');

			return message.channel.send({ embeds: [noResultsEmbed] }).catch(e => {
				throw new Tantrum(client, 'play.js', 'Error on sending noResultsEmbed', e);
			});
		}

		track.playlist ? queue.addTracks(track.tracks) : queue.addTrack(track.tracks[0]);

		await queue.connect(message.member.voice.channel).catch(e => {
			queue.destroy();
			new Tantrum(client, 'play.js', 'Error when connecting to vc', e);
			message.channel.send('Something went wrong when joining').catch(f => {
				throw new Tantrum(client, 'play.js', 'Error on sending failed to join message', f);
			});
		});

		if (!queue.playing) await queue.play();
	},
};
