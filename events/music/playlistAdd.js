const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, message, queue, playlist) => {

	const queuedEmbed = new Discord.MessageEmbed()
		.setColor(tofuGreen)
		.setDescription(`Queued ${playlist.tracks.length} tracks`);

	message.channel.send(queuedEmbed).catch(e => {
		throw new Tantrum(client, 'playlistAdd.js', 'Error on sending queuedEmbed', e);
	});
};
