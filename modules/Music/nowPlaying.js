const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');
const { createBar } = require('#utils/createBar.js');
const { humanReadableDuration } = require('#utils/buildTimeString.js');

module.exports = {
	name: 'nowplaying',
	helpTitle: 'Now Playing',
	category: 'Music',
	usage: 'nowplaying',
	description: 'Check what\'s that vibing choon',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['now-playing', 'np', 'currentsong', 'currentsong', 'cs'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);

		const track = queue.current;
		if (!track) return; // In between songs, there is no now playing. In that case, return to avoid erroring out.

		const totalTrackTime = track.durationMS;
		const currentTime = queue.streamTime;

		const humanTotalTime = humanReadableDuration(totalTrackTime);
		const humanCurrentTime = humanReadableDuration(currentTime);

		const nowPlayingEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setDescription(`[${track.title}](${track.url}) [${track.requestedBy}]`)
			.setFooter(`${createBar(totalTrackTime, currentTime, 20)[0]} ${humanCurrentTime} / ${humanTotalTime}`);

		message.channel.send({ embeds: [nowPlayingEmbed] }).catch(e => {
			throw new Tantrum(client, 'nowPlaying.js', 'Error on sending nowPlayingEmbed', e);
		});
	},
};
