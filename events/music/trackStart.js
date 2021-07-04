const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, message, track) => {

	const nowPlayingEmbed = new Discord.MessageEmbed()
		.setColor(tofuGreen)
		.setTitle('Now playing')
		.setDescription(`[${track.title}](${track.url}) [${track.requestedBy}]`);

	message.channel.send(nowPlayingEmbed).catch(e => { // TODO: Embedify and test
		throw new Tantrum(client, 'trackStart.js', 'Error sending nowPlayingEmbed', e);
	});
};
