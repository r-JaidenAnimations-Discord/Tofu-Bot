const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const { createBar } = require('#utils/createBar.js');
const { humanReadableDuration } = require('#utils/buildTimeString.js');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'nowplaying',
	helpTitle: 'Now Playing',
	category: 'Music',
	usage: 'nowplaying',
	description: 'Check what\'s that vibing choon',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['now-playing', 'np', 'currentsong', 'currentsong', 'cs'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;

		const player = await LavaManager.getPlayer(client, message);
		if (!player) return;

		const track = player.queue.current;

		if (!track) return; // In between songs, there is no now playing. In that case, return to avoid erroring out.

		const totalTrackTime = track.length;
		const currentTime = player.accuratePosition || 0;

		const humanTotalTime = humanReadableDuration(totalTrackTime);
		const humanCurrentTime = humanReadableDuration(currentTime);

		const footer = track.isStream ? `${createBar(2, 1, 20, '▬', '🔴LIVE')}` : `${createBar(totalTrackTime, currentTime, 20)} ${humanCurrentTime} / ${humanTotalTime}`;

		const nowPlayingEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setDescription(`[${track.title}](${track.uri}) [<@${track.requester}>]`)
			.setFooter(footer);

		message.channel.send({ embeds: [nowPlayingEmbed] });
	},
};
