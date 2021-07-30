const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { musicStrings } = require('#assets/global/strings.json');

module.exports = (client, queue) => {
	const timeOutEmbed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setDescription(musicStrings.inactiveTimeout);

	queue.metadata.channel.send({ embeds: [timeOutEmbed] }).catch(e => {
		throw new Tantrum(client, 'channelEmpty', 'Error on sending timeOutEmbed', e);
	});
};
