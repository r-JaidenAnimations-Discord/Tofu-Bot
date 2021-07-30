const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, queue, track) => {
	const trackQueuedEmbed = new Discord.MessageEmbed()
		.setColor(tofuGreen)
		.setDescription(`Queued [${track.title}](${track.url}) [${track.requestedBy}]`);

	queue.metadata.channel.send({ embeds: [trackQueuedEmbed] }).catch(e => {
		throw new Tantrum(client, 'trackAdd.js', 'Error on sending trackQueuedEmbed', e);
	});
};
