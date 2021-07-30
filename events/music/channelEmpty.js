const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { musicStrings } = require('#assets/global/strings.json');

module.exports = (client, message, queue) => {

	const timeOutEmbed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setDescription(musicStrings.inactiveTimeout);


	console.log('Timeoutembed channelempty test executed')
	message.channel.send({ embeds: [timeOutEmbed] }).catch(e => { // TODO: test
		throw new Tantrum(client, 'channelEmpty', 'Error on sending timeOutEmbed', e);
	});
};
