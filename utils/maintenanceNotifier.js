const Discord = require('discord.js');
const { tofuRed } = require('#colors');

const notifyMaintenance = async (message) => {
	const embed = new Discord.MessageEmbed()
		.setColor(tofuRed)
		.setTitle('🛠️ **Planned Maintenance!**')
		.setDescription('Hi, i\'m tofu, i\'ma go sleep for some fixes like getting my nails done and stuff. So i won\'t respond for a while when i go. Thanks for understanding');

	message.channel.send({ embeds: [embed] });
};

module.exports = {
	notifyMaintenance
};
