const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { musicStrings } = require('#commandData/strings.json');

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
