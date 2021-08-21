const { tofuGreen } = require('#colors');
const Discord = require('discord.js');

module.exports = (client, queue, tracks) => {
	const bulkQueuedEmbed = new Discord.MessageEmbed()
		.setColor(tofuGreen)
		.setDescription(`Queued **${tracks.length}** tracks`);

	queue.metadata.channel.send({ embeds: [bulkQueuedEmbed] }).catch(e => {
		throw new Tantrum(client, 'tracksAdd.js', 'Error sending bulkQueuedEmbed', e);
	});
};
