//const { tofuOrange } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');

module.exports = (client, message, query, tracks) => {
	const { tofuOrange } = client.config;

	const searchCancelEmbed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setDescription('Invalid response, search cancelled.');

	try {
		message.channel.send(searchCancelEmbed);
	} catch (e) {
		throw new Tantrum(client, 'searchCancel.js', 'Error on sending searchCancelEmbed', e);
	}
};
