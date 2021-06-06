//const { tofuGreen } = require('../../config.json');
const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, message, queue, track) => {
	// const { tofuGreen } = client.config;

	message.channel.send(`${track.title} has been added to the queue !`);
	const trackQueuedEmbed = new Discord.MessageEmbed()
		.setColor(tofuGreen)
		.setDescription(`Queued [${track.title}](${track.url}) [${track.requestedBy}]`);

	try {
		message.channel.send(trackQueuedEmbed);
	} catch (e) {
		throw new Tantrum(client, 'trackAdd.js', 'Error on sending trackQueuedEmbed', e);
	}
};
