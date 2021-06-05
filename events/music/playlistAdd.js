//const { tofuGreen } = require('../../config.json');
const { tofuGreen } = require('../../commanddata/colors.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');

module.exports = (client, message, queue, playlist) => {
	// const { tofuGreen } = client.config;

	const queuedEmbed = new Discord.MessageEmbed()
		.setColor(tofuGreen)
		.setDescription(`Queued ${playlist.tracks.length} tracks`);

	try {
		message.channel.send(queuedEmbed);
	} catch (e) {
		throw new Tantrum(client, 'playlistAdd.js', 'Error on sending queuedEmbed', e);
	}
};
