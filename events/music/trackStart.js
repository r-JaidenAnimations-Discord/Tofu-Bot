const { tofuGreen } = require('#colors');
const Discord = require('discord.js');

module.exports = (client, queue, track) => {
	const nowPlayingEmbed = new Discord.MessageEmbed()
		.setColor(tofuGreen)
		.setTitle('Now playing')
		.setDescription(`[${track.title}](${track.url}) [${track.requestedBy}]`);

	queue.metadata.channel.send({ embeds: [nowPlayingEmbed] });
};
