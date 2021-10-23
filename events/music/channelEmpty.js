const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const { musicStrings } = require('#assets/global/strings.json');

module.exports = (client, queue) => {
	const timeOutEmbed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setDescription(musicStrings.inactiveTimeout);

	queue.metadata.channel.send({ embeds: [timeOutEmbed] });
};
