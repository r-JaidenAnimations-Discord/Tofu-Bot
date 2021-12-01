const { MessageEmbed } = require('discord.js');
const LavaManager = require('#handlers/lavaManager.js');
const { musicStrings } = require('#assets/global/strings.json');
const { tofuOrange } = require('#colors');

module.exports = (client, queue) => {
	LavaManager.lavaLog('Queue finished, setting inactivity timer');
	if (queue.player.timeout) {
		clearTimeout(queue.player.timeout);
	}
	queue.player.timeout = setTimeout(p => {
		LavaManager.lavaLog('Inactive for too long, destroying player');
		const channel = p.queue.channel;
		p.disconnect();
		client.music.destroyPlayer(p.guildId);
		const embed = new MessageEmbed()
			.setColor(tofuOrange)
			.setDescription(musicStrings.inactiveTimeout);

		channel.send({ embeds: [embed] });
	}, client.config.musicTimeout, queue.player);
};
