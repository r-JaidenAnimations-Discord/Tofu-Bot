const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, message, query, tracks) => {

	const searchCancelEmbed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setDescription('Invalid response, search cancelled.');

	try {
		message.channel.send(searchCancelEmbed);
	} catch (e) {
		throw new Tantrum(client, 'searchCancel.js', 'Error on sending searchCancelEmbed', e);
	}
};
