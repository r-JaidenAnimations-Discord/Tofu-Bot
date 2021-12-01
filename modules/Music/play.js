/**
 * Dear future me. Please forgive me. I can't even begin to express how sorry I am.
 */
const { tofuGreen, tofuOrange, tofuError } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { SpotifyItemType } = require('@lavaclient/spotify');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'play',
	helpTitle: 'Play',
	category: 'Music',
	usage: 'play [query]',
	description: 'Play some choons',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['p'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.nodeChecks(client, message)) return console.log('nodechecks failed');
		if (!LavaManager.vcChecks(client, message)) return console.log('vc checks failed');

		// if queue exists, and paused, resume
		const existing = await LavaManager.getPlayer(client, message);
		if (existing && existing.paused) {
			if (existing.resume()) {
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

		const embed = new Discord.MessageEmbed();
		const query = args.slice(0).join(' ');

		let tracks = [];
		if (client.music.spotify.isSpotifyUrl(query)) {
			const item = await client.music.spotify.load(query);
			switch (item?.type) {
				case SpotifyItemType.Track: {
					LavaManager.lavaLog('Spotify track given');
					const track = await item.resolveYoutubeTrack();
					tracks = [track];
					embed.setColor(tofuGreen);
					embed.setDescription(`Queued [${item.name}](${query}) [${message.author}]`);
					break;
				}
				case SpotifyItemType.Album:
				case SpotifyItemType.Playlist:
				case SpotifyItemType.Artist:
					LavaManager.lavaLog('Spotify list given');
					tracks = await item.resolveYoutubeTracks();
					embed.setColor(tofuGreen);
					embed.setDescription(`Queued **${tracks.length}** tracks`);
					break;
				default:
					embed.setDescription('Found no results from your Spotify query.');
					embed.setColor(tofuError);
					message.channel.send({ embed: [embed] });
					return;
			}
		}
		else {
			const results = await client.music.rest.loadTracks(/^https?:\/\//.test(query) ? query : `ytsearch:${query}`);

			switch (results.loadType) {
				case 'PLAYLIST_LOADED':
					LavaManager.lavaLog('Youtube list given');
					tracks = results.tracks;
					embed.setColor(tofuGreen);
					embed.setDescription(`Queued ${tracks.length} tracks`);
					break;
				case 'TRACK_LOADED':
				case 'SEARCH_RESULT': {
					LavaManager.lavaLog('Youtube track given');
					const [track] = results.tracks;
					tracks = [track];
					embed.setColor(tofuGreen);
					embed.setDescription(`Queued [${track.info.title}](${track.info.uri}) [${message.author}]`);
					break;
				}
				case 'NO_MATCHES': {
					LavaManager.lavaLog('Nothing found');
					embed.setColor(tofuError);
					embed.setDescription('No matches found!');
					message.channel.send({ embeds: [embed] });
					break;
				}
				default:
					console.log(results);
					embed.setColor(tofuError);
					embed.setDescription('Tofu choked :headstone:');
					embed.setFooter('Please try again later');
					embed.setTimestamp();
					message.channel.send({ embeds: [embed] });
					return;
			}
		}

		const player = existing ? existing : await LavaManager.createPlayer(client, message);

		player.queue.add(tracks, { requester: message.author.id, insert: null });

		const started = player.playing || player.paused;

		if (!started) await player.queue.start();

		message.channel.send({ embeds: [embed] });
	},
};
