const { tofuGreen } = require('#colors');
const Discord = require('discord.js');

module.exports = (client, queue, track) => {
	const trackQueuedEmbed = new Discord.MessageEmbed()
		.setColor(tofuGreen)
		.setDescription(`Queued [${track.title}](${track.url}) [${track.requestedBy}]`);

	if (queue.tracks.length >= 1 && queue.playing) queue.metadata.channel.send({ embeds: [trackQueuedEmbed] });
};
