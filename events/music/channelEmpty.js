const { tofuOrange } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = (client, message, queue) => {
	const timeOutEmbed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setDescription(musicStrings.inactiveTimeout);

	try {
		message.channel.send(timeOutEmbed);
	} catch (e) {
		throw new Tantrum(client, 'channelEmpty', 'Error on sending timeOutEmbed', e);
	}
};
