const { MessageEmbed } = require('discord.js');
const LavaManager = require('#handlers/lavaManager.js');
const { tofuGreen } = require('#colors');

module.exports = (client, queue, song) => {
	LavaManager.lavaLog('Starting track');
	queue.player.pause(false);
	if (queue.player.timeout) {
		LavaManager.lavaLog('Player not destroyed because inactivity. Destroying inactivity timer');
		clearTimeout(queue.player.timeout);
		delete queue.player.timeout;
	}

	const embed = new MessageEmbed()
		.setColor(tofuGreen)
		.setTitle('Now playing')
		.setDescription(`[${song.title}](${song.uri}) [<@${song.requester}>]`);

	queue.channel.send({ embeds: [embed] });
};
