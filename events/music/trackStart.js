//const { tofuGreen } = require('../../config.json');
const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, message, track) => {
	// const { tofuGreen } = client.config;

	const nowPlayingEmbed = new Discord.MessageEmbed()
		.setColor(tofuGreen)
		.setTitle('Now playing')
		.setDescription(`[${track.title}](${track.url}) [${track.requestedBy}]`);

	try {
		message.channel.send(nowPlayingEmbed);
	} catch (e) {
		throw new Tantrum(client, 'trackStart.js', 'Error sending nowPlayingEmbed', e);
	}
};
